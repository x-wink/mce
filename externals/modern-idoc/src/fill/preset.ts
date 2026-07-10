import type { Color, NormalizedColor } from '../color'
import type { WithNone } from '../types'
import { normalizeColor } from '../color'
import { isNone, pick } from '../utils'

export interface PresetFillObject {
  preset: string
  foregroundColor?: WithNone<Color>
  backgroundColor?: WithNone<Color>
}

export type PresetFill =
  | string
  | PresetFillObject

export interface NormalizedPresetFill extends PresetFillObject {
  foregroundColor?: NormalizedColor
  backgroundColor?: NormalizedColor
}

export const presetFillFiedls: (keyof NormalizedPresetFill)[] = [
  'preset',
  'foregroundColor',
  'backgroundColor',
]

export function normalizePresetFill(fill: PresetFill): NormalizedPresetFill {
  let obj: NormalizedPresetFill
  if (typeof fill === 'string') {
    obj = { preset: fill }
  }
  else {
    obj = { ...fill } as any
  }
  if (isNone(obj.foregroundColor)) {
    delete obj.foregroundColor
  }
  else {
    obj.foregroundColor = normalizeColor(obj.foregroundColor)
  }
  if (isNone(obj.backgroundColor)) {
    delete obj.backgroundColor
  }
  else {
    obj.backgroundColor = normalizeColor(obj.backgroundColor)
  }
  return pick(obj, presetFillFiedls)
}
