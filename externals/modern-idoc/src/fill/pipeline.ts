import { clearUndef } from '../utils'

/**
 * 图片处理管线步骤：引用一个已注册的具名管线 + 参数。
 *
 * 数据只记录「用了哪个管线 + 参数」，处理函数（image → image）是运行时注册的黑盒，
 * 不入持久化数据。渲染端按需把 `图片 + imagePipelines` 烘焙到运行时纹理；导出端按需物化成成品图。
 */
export interface ImagePipeline {
  name: string
  params?: Record<string, any>
}

export interface NormalizedImagePipeline extends ImagePipeline {
  //
}

/**
 * 跨端的中立图片像素结构（等价 `ImageData`），供管线处理函数 `image → image` 使用。
 * 不依赖 DOM，可在浏览器与 node 导出环境一致运行。
 */
export interface PipelineImage {
  data: Uint8ClampedArray
  width: number
  height: number
}

export function normalizeImagePipeline(pipeline: ImagePipeline): NormalizedImagePipeline {
  return clearUndef({
    name: pipeline.name,
    params: pipeline.params,
  })
}
