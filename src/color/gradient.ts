import type { NormalizedColor } from './color'
import type {
  ColorStopNode,
  LinearGradientNode,
  RadialGradientNode,
  RepeatingLinearGradientNode,
  RepeatingRadialGradientNode,
} from './gradient-parser'
import { round } from '../utils'
import { normalizeColor } from './color'
import { parseGradient } from './gradient-parser'

export interface ColorStop {
  offset: number
  color: NormalizedColor
}

export interface LinearGradient {
  angle: number
  stops: ColorStop[]
  repeat?: boolean
}

export type LinearGradientWithType = LinearGradient & {
  type: 'linear-gradient'
}

export interface RadialGradient {
  stops: ColorStop[]
  repeat?: boolean
}

export type RadialGradientWithType = RadialGradient & {
  type: 'radial-gradient'
}

function parseColorStopNodeList(colorStops: ColorStopNode[]): ColorStop[] {
  const count = colorStops.length - 1
  return colorStops.map((stop, index) => {
    const value = stop.value
    let offset = round(index / count, 3)
    let color = '#00000000'
    switch (stop.type) {
      case 'rgb':
        color = normalizeColor({
          r: Number(value[0] ?? 0),
          g: Number(value[1] ?? 0),
          b: Number(value[2] ?? 0),
        })
        break
      case 'rgba':
        color = normalizeColor({
          r: Number(value[0] ?? 0),
          g: Number(value[1] ?? 0),
          b: Number(value[2] ?? 0),
          a: Number(value[3] ?? 0),
        })
        break
      case 'literal':
        color = normalizeColor(stop.value)
        break
      case 'hex':
        color = normalizeColor(`#${stop.value}`)
        break
    }
    switch (stop.length?.type) {
      case '%':
        offset = Number(stop.length.value) / 100
        break
      case 'px':
        // TODO
        break
      case 'em':
        // TODO
        break
    }
    return { offset, color }
  })
}

function parseLinearGradientNode(node: LinearGradientNode | RepeatingLinearGradientNode): LinearGradientWithType {
  let angle = 0
  switch (node.orientation?.type) {
    case 'angular':
      angle = Number(node.orientation.value)
      break
    case 'directional':
      // TODO
      break
  }

  return {
    type: 'linear-gradient',
    angle,
    stops: parseColorStopNodeList(node.colorStops),
  }
}

function parseRadialGradientNode(node: RadialGradientNode | RepeatingRadialGradientNode): RadialGradientWithType {
  node.orientation?.map((item) => {
    switch (item?.type) {
      case 'shape':
      case 'default-radial':
      case 'extent-keyword':
      default:
        return null
    }
  })

  return {
    type: 'radial-gradient',
    stops: parseColorStopNodeList(node.colorStops),
  }
}

export function isGradient(cssText: string): boolean {
  return cssText.startsWith('linear-gradient(')
    || cssText.startsWith('radial-gradient(')
}

export function normalizeGradient(cssText: string): (LinearGradientWithType | RadialGradientWithType)[] {
  return parseGradient(cssText)
    .map((node) => {
      switch (node?.type) {
        case 'linear-gradient':
          return parseLinearGradientNode(node)
        case 'repeating-linear-gradient':
          return { ...parseLinearGradientNode(node), repeat: true }
        case 'radial-gradient':
          return parseRadialGradientNode(node)
        case 'repeating-radial-gradient':
          return { ...parseRadialGradientNode(node), repeat: true }
        default:
          return undefined
      }
    })
    .filter(Boolean) as (LinearGradientWithType | RadialGradientWithType)[]
}
