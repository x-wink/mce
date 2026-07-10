import type { Toggleable } from '../types'
import type { ColorFill, ColorFillObject, NormalizedColorFill } from './color'
import type { GradientFill, GradientFillObject, NormalizedGradientFill } from './gradient'
import type { ImageFill, ImageFillObject, NormalizedImageFill } from './image'
import type { NormalizedPresetFill, PresetFill, PresetFillObject } from './preset'
import { isColor, isGradient } from '../color'
import { clearUndef, isNone, pick } from '../utils'
import { colorFillFields, normalizeColorFill } from './color'
import { gradientFillFields, normalizeGradientFill } from './gradient'
import { imageFillFiedls, normalizeImageFill } from './image'
import { normalizePresetFill, presetFillFiedls } from './preset'

export type FillObject =
  & Partial<Toggleable>
  & Partial<ColorFillObject>
  & Partial<GradientFillObject>
  & Partial<ImageFillObject>
  & Partial<PresetFillObject>

export type Fill =
  | string
  | FillObject

export type NormalizedFill =
  & Toggleable
  & Partial<NormalizedColorFill>
  & Partial<NormalizedGradientFill>
  & Partial<NormalizedImageFill>
  & Partial<NormalizedPresetFill>

export function isColorFillObject(fill: FillObject): fill is ColorFillObject {
  return !isNone(fill.color)
}

export function isColorFill(fill: Fill): fill is ColorFill {
  return typeof fill === 'string'
    ? isColor(fill)
    : isColorFillObject(fill)
}

export function isGradientFillObject(fill: FillObject): fill is GradientFillObject {
  return (!isNone(fill.image) && isGradient(fill.image))
    || Boolean(fill.linearGradient)
    || Boolean(fill.radialGradient)
}

export function isGradientFill(fill: Fill): fill is GradientFill {
  return typeof fill === 'string'
    ? isGradient(fill)
    : isGradientFillObject(fill)
}

export function isImageFillObject(fill: FillObject): fill is ImageFillObject {
  return !isNone(fill.image) && !isGradient(fill.image)
}

export function isImageFill(fill: Fill): fill is ImageFill {
  return typeof fill === 'string'
    ? !isColor(fill) && !isGradient(fill)
    : isImageFillObject(fill)
}

export function isPresetFillObject(fill: FillObject): fill is PresetFillObject {
  return !isNone(fill.preset)
}

export function isPresetFill(fill: Fill): fill is PresetFill {
  return typeof fill === 'string'
    ? false // TODO
    : isPresetFillObject(fill)
}

export function normalizeFill(fill: Fill): NormalizedFill {
  const enabled = fill && typeof fill === 'object'
    ? (fill.enabled ?? true)
    : true

  const obj = { enabled } as NormalizedFill

  if (isColorFill(fill)) {
    Object.assign(obj, normalizeColorFill(fill))
  }

  if (isGradientFill(fill)) {
    Object.assign(obj, normalizeGradientFill(fill))
  }

  if (isImageFill(fill)) {
    Object.assign(obj, normalizeImageFill(fill))
  }

  if (isPresetFill(fill)) {
    Object.assign(obj, normalizePresetFill(fill))
  }

  return pick(clearUndef(obj), Array.from(new Set([
    'enabled',
    ...colorFillFields,
    ...imageFillFiedls,
    ...gradientFillFields,
    ...presetFillFiedls,
  ])))
}
