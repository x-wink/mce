import type { Colord } from 'colord'
import { colord } from 'colord'
import { round } from '../utils'

export interface RgbColor { r: number, g: number, b: number }
export interface HslColor { h: number, s: number, l: number }
export interface HsvColor { h: number, s: number, v: number }
export interface HwbColor { h: number, w: number, b: number }
export interface XyzColor { x: number, y: number, z: number }
export interface LabColor { l: number, a: number, b: number }
export interface LchColor { l: number, c: number, h: number }
export interface CmykColor { c: number, m: number, y: number, k: number }
type WithAlpha<O> = O & { a: number }
export type RgbaColor = WithAlpha<RgbColor>
export type HslaColor = WithAlpha<HslColor>
export type HsvaColor = WithAlpha<HsvColor>
export type HwbaColor = WithAlpha<HwbColor>
export type XyzaColor = WithAlpha<XyzColor>
export type LabaColor = LabColor & { alpha: number }
export type LchaColor = WithAlpha<LchColor>
export type CmykaColor = WithAlpha<CmykColor>
export type ObjectColor = RgbColor | RgbaColor | HslColor | HslaColor | HsvColor | HsvaColor | HwbColor | HwbaColor | XyzColor | XyzaColor | LabColor | LabaColor | LchColor | LchaColor | CmykColor | CmykaColor
export type Uint32Color = number
export type Color = Uint32Color | ObjectColor | string
export type Hex8Color = string
export type NormalizedColor = Hex8Color

export function parseColor(color: Color): Colord {
  let input: ObjectColor | string
  if (typeof color === 'number') {
    input = {
      r: (color >> 24) & 0xFF,
      g: (color >> 16) & 0xFF,
      b: (color >> 8) & 0xFF,
      a: (color & 0xFF) / 255,
    }
  }
  else {
    input = color
  }

  return colord(input)
}

function roundRgba(rgba: RgbaColor): RgbaColor {
  return {
    r: round(rgba.r),
    g: round(rgba.g),
    b: round(rgba.b),
    a: round(rgba.a, 3),
  }
}

function format(number: number): string {
  const hex = number.toString(16)
  return hex.length < 2 ? `0${hex}` : hex
}

export const defaultColor: NormalizedColor = '#000000FF'

export function isColor(value: string): boolean {
  return parseColor(value).isValid()
}

export function normalizeColor(color: Color, orFail = false): NormalizedColor {
  const parsed = parseColor(color)

  if (!parsed.isValid()) {
    if (typeof color === 'string') {
      // linear-gradient radial-gradient
      return color
    }

    const message = `Failed to normalizeColor ${color}`
    if (orFail) {
      throw new Error(message)
    }
    else {
      console.warn(message)
      return defaultColor
    }
  }

  const { r, g, b, a } = roundRgba(parsed.rgba)

  return `#${format(r)}${format(g)}${format(b)}${format(round(a * 255))}`
}
