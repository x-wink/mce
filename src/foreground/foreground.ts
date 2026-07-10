import type { FillObject, NormalizedFill } from '../fill'
import { normalizeFill } from '../fill'
import { clearUndef, pick } from '../utils'

export interface NormalizedBaseForeground {
  fillWithShape?: boolean
}

export type NormalizedForeground =
  & NormalizedBaseForeground
  & NormalizedFill

export type ForegroundObject =
  & Partial<NormalizedBaseForeground>
  & FillObject

export type Foreground =
  | string
  | ForegroundObject

export function normalizeForeground(foreground: Foreground): NormalizedForeground | undefined {
  if (typeof foreground === 'string') {
    return {
      ...normalizeFill(foreground),
    }
  }

  // 图片处理管线（imagePipelines）由 normalizeFill 在 fill 层规范化，foreground 继承即可。
  return clearUndef({
    ...normalizeFill(foreground),
    ...pick(foreground, ['fillWithShape']),
  })
}
