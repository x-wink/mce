import type { Color, NormalizedColor } from '../color'
import { normalizeColor } from '../color'
import { pick } from '../utils'

export interface ColorFillObject {
  color: Color
}

export type ColorFill =
  | string
  | ColorFillObject

export interface NormalizedColorFill {
  color: NormalizedColor
}

export const colorFillFields: (keyof NormalizedColorFill)[] = [
  'color',
]

export function normalizeColorFill(fill: ColorFill): NormalizedColorFill {
  let obj: ColorFillObject
  if (typeof fill === 'string') {
    obj = { color: fill }
  }
  else {
    obj = { ...fill }
  }
  if (obj.color) {
    obj.color = normalizeColor(obj.color)
  }
  return pick(obj as NormalizedColorFill, colorFillFields)
}
