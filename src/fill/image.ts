import type { ImagePipeline, NormalizedImagePipeline } from './pipeline'
import { clearUndef, pick } from '../utils'
import { normalizeImagePipeline } from './pipeline'

/**
 * 0    -0.5   0
 * -0.5        -0.5
 * 0    -0.5   0
 */
export interface ImageFillCropRect {
  left?: number
  top?: number
  bottom?: number
  right?: number
}

/**
 * 0    0.5   0
 * 0.5        0.5
 * 0    0.5   0
 */
export interface ImageFillStretchRect {
  left?: number
  top?: number
  bottom?: number
  right?: number
}

export interface ImageFillTile {
  alignment?: string
  scaleX?: number
  scaleY?: number
  translateX?: number
  translateY?: number
  flip?: string
}

export interface ImageFillObject {
  image: string
  cropRect?: ImageFillCropRect
  stretchRect?: ImageFillStretchRect
  tile?: ImageFillTile
  dpi?: number
  opacity?: number
  rotateWithShape?: boolean
  /**
   * 图片处理管线：图片源在上屏/导出前依次流经的具名处理步骤（image → image）。
   * 只记录管线名与参数；处理函数为运行时注册的黑盒，不入数据。
   */
  imagePipelines?: ImagePipeline[]
}

export type ImageFill =
  | string
  | ImageFillObject

export interface NormalizedImageFill extends ImageFillObject {
  imagePipelines?: NormalizedImagePipeline[]
}

export const imageFillFiedls: (keyof NormalizedImageFill)[] = [
  'image',
  'cropRect',
  'stretchRect',
  'tile',
  'dpi',
  'opacity',
  'rotateWithShape',
  'imagePipelines',
]

export function normalizeImageFill(fill: ImageFill): NormalizedImageFill {
  let obj: ImageFillObject
  if (typeof fill === 'string') {
    obj = { image: fill }
  }
  else {
    obj = { ...fill }
  }
  const normalized = pick(obj, imageFillFiedls) as NormalizedImageFill
  normalized.imagePipelines = obj.imagePipelines?.length
    ? obj.imagePipelines.map(normalizeImagePipeline)
    : undefined
  return clearUndef(normalized)
}
