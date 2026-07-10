import type { Fonts as BaseFonts } from 'modern-font'
import type { ImagePipeline, PipelineImage } from 'modern-idoc'
import type { Pdf } from './Pdf'
import type { Font, Resource } from './resources'
import { fonts as globalBaseFonts } from 'modern-font'
import { FontType0, FontType1, XObjectImage } from './resources'

export interface AssetResource {
  loading: boolean
  promise: Promise<Resource>
  value?: Resource
}

export class Asset {
  loaded = new Map<string, AssetResource>()

  protected get _fonts(): BaseFonts {
    return this._pdf.fonts ?? globalBaseFonts
  }

  get fallbackFont(): Font | undefined {
    return FontType1.fallbackFont
  }

  constructor(
    protected _pdf: Pdf,
  ) {
    //
  }

  protected async _load<T extends Resource>(url: string, handle: () => T | Promise<T>): Promise<T> {
    let assetResource = this.loaded.get(url)
    if (!assetResource) {
      assetResource = {
        loading: true,
        promise: Promise.resolve(handle())
          .then((resource) => {
            resource.setPdf(this._pdf)
            assetResource!.value = resource
            return resource
          })
          .finally(() => {
            assetResource!.loading = false
          }),
        value: undefined,
      }
      this.loaded.set(url, assetResource)
    }
    return assetResource.promise as any
  }

  async fetchImageBitmap(url: string, options?: ImageBitmapOptions): Promise<ImageBitmap> {
    if (url.startsWith('http')) {
      return await fetch(url)
        .then(rep => rep.blob())
        .then((blob) => {
          if (blob.type === 'image/svg+xml') {
            return blob.text().then((text) => {
              return this.fetchImageBitmap(`data:image/svg+xml;charset=utf-8,${encodeURIComponent(text)}`, options)
            })
          }
          return createImageBitmap(blob, options)
        })
    }
    else {
      function fixSvg(text: string): string {
        const svgHead = text.match(/^<svg[^>]+>/)?.[0]
        if (svgHead && (!/width=".*"/.test(svgHead) || !/height=".*"/.test(svgHead))) {
          text = text.replace(
            svgHead,
            svgHead
              .replace(/((width)|(height))=".*?"/g, '')
              // eslint-disable-next-line regexp/no-super-linear-backtracking
              .replace(/(viewBox=".+? .+? (.+?) (.+?)")/, '$1 width="$2" height="$3"'),
          )
        }
        return text
      }
      if (url.startsWith('data:image/svg+xml;charset=utf-8,')) {
        url = url.substring('data:image/svg+xml;charset=utf-8,'.length)
        url = decodeURIComponent(url)
        url = fixSvg(url)
        url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(url)}`
      }
      else if (url.startsWith('data:image/svg+xml;base64,')) {
        url = url.substring('data:image/svg+xml;base64,'.length)
        url = atob(url)
        url = fixSvg(url)
        url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(url)}`
      }
      return new Promise<HTMLImageElement>((resolve) => {
        const img = new Image()
        img.src = url
        img.onload = () => img.decode().finally(() => resolve(img))
      }).then(img => createImageBitmap(img, options))
    }
  }

  addImage(url: string, filter?: string, imagePipelines?: ImagePipeline[]): Promise<XObjectImage> {
    const resolver = this._pdf.imagePipelineResolver
    const usePipelines = Boolean(imagePipelines?.length && resolver)
    // 缓存键含 filter / 管线，避免同 url 的不同处理版本互相覆盖
    const key = [
      url,
      filter && `filter:${filter}`,
      usePipelines && `pipelines:${JSON.stringify(imagePipelines)}`,
    ].filter(Boolean).join('|')
    return this._load(key, async () => {
      let bitmap = await this.fetchImageBitmap(url)
      // 带图片处理管线时：解码像素 → 经注入的解析器烘焙 → 回到 bitmap，再嵌入 PDF。
      if (usePipelines) {
        bitmap = await this._applyImagePipelines(bitmap, imagePipelines!, resolver!)
      }
      const resource = XObjectImage.from(bitmap, this._pdf.colorSpace, filter)
      bitmap.close()
      return resource
    })
  }

  /** 把 bitmap 解码为像素、跑管线、再编码回 bitmap。 */
  protected async _applyImagePipelines(
    bitmap: ImageBitmap,
    imagePipelines: ImagePipeline[],
    resolver: (imagePipelines: ImagePipeline[], image: PipelineImage) => Promise<PipelineImage | undefined>,
  ): Promise<ImageBitmap> {
    const w = Math.max(1, bitmap.width)
    const h = Math.max(1, bitmap.height)
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')!
    ctx.drawImage(bitmap, 0, 0)
    bitmap.close()
    const imageData = ctx.getImageData(0, 0, w, h)
    const out = await resolver(imagePipelines, { data: imageData.data, width: w, height: h })
    if (!out) {
      return await createImageBitmap(canvas)
    }
    canvas.width = out.width
    canvas.height = out.height
    const outData = ctx.createImageData(out.width, out.height)
    outData.data.set(out.data)
    ctx.putImageData(outData, 0, 0)
    return await createImageBitmap(canvas)
  }

  /** Rasterize an SVG document string into an image XObject (via the SVG data URL path). */
  addSvg(svg: string): Promise<XObjectImage> {
    return this.addImage(`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`)
  }

  addFont(family: string, resource?: Font): Promise<Font> {
    return this._load(family, () => {
      if (resource) {
        return resource
      }
      else {
        const result = this._fonts.get(family)
        if (!result) {
          throw new Error(`Failed to loadFont: ${family}`)
        }
        return FontType0.from(family, result.buffer)
      }
    })
  }

  async getFont(family: string): Promise<Font> {
    let promise = this.loaded.get(family)?.promise as any
    if (!promise) {
      await this.addFont(family)
      promise = this.loaded.get(family)?.promise as any
    }
    if (!promise) {
      throw new Error(`Failed to loadFont: ${family}`)
    }
    return promise
  }

  get(url: string): Resource | undefined {
    return this.loaded.get(url)?.value
  }

  async waitUntilLoad(): Promise<Resource[]> {
    const assetResources = Array.from(this.loaded.values())
    await Promise.all(
      assetResources
        .filter(assetResource => assetResource.loading)
        .map(assetResource => assetResource.promise),
    )
    return assetResources
      .filter(assetResource => assetResource.value)
      .map(assetResource => assetResource.value!)
  }
}
