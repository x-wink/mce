import type { NormalizedColor } from '../color'
import type { Toggleable } from '../types'

export type Shape =
  | SVGPathData
  | SVGPathData[]
  | ShapePath[]
  | NormalizedShape

export type SVGPathData = string
export type FillRule = 'nonzero' | 'evenodd'
export type StrokeLinecap = 'butt' | 'round' | 'square'
export type StrokeLinejoin = 'arcs' | 'bevel' | 'miter' | 'miter-clip' | 'round'

export interface ShapePathStyle {
  [key: string]: any
  opacity: number
  visibility: string
  // shadow
  shadowColor: NormalizedColor
  shadowOffsetX: number
  shadowOffsetY: number
  shadowBlur: number
  // fill
  fill: string
  fillOpacity: number
  fillRule: FillRule
  // stroke
  stroke: string
  strokeOpacity: number
  strokeWidth: number
  strokeLinecap: StrokeLinecap
  strokeLinejoin: StrokeLinejoin
  strokeMiterlimit: number
  strokeDasharray: number[]
  strokeDashoffset: number
}

export interface ShapePath extends Partial<ShapePathStyle> {
  data: SVGPathData
}

export interface ShapeConnectionPoint {
  idx: number
  x: number
  y: number
  ang?: number
}

export interface NormalizedShape extends Toggleable {
  preset?: string
  viewBox?: number[]
  svg?: string
  paths?: ShapePath[]
  connectionPoints?: ShapeConnectionPoint[]
}

export function normalizeShape(shape: Shape): NormalizedShape {
  if (typeof shape === 'string') {
    if (shape.startsWith('<svg')) {
      return {
        enabled: true,
        svg: shape,
      }
    }
    else {
      return {
        enabled: true,
        paths: [
          { data: shape },
        ],
      }
    }
  }
  else if (Array.isArray(shape)) {
    return {
      enabled: true,
      paths: shape.map((data) => {
        if (typeof data === 'string') {
          return {
            data,
          }
        }
        return data
      }),
    }
  }
  else {
    return shape
  }
}
