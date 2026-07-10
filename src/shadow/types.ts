import type { Color, NormalizedColor } from '../color'
import type { Toggleable, WithNone } from '../types'

export type BoxShadow = string

export type Shadow =
  | BoxShadow
  | ShadowObject

export type ShadowObject =
  & Partial<Toggleable>
  & Partial<NormalizedShadow>
  & {
    color?: WithNone<Color>
  }

export interface NormalizedShadow extends Toggleable {
  color: NormalizedColor
  offsetX?: number
  offsetY?: number
  blur?: number
}
