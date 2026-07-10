import type { NormalizedColor } from '../color'
import type { BoxShadow } from './types'

export interface NormalizedShadowStyle {
  boxShadow: BoxShadow

  // extended part
  shadowColor?: NormalizedColor
  shadowOffsetX?: number
  shadowOffsetY?: number
  shadowBlur?: number
}

export function getDefaultShadowStyle(): NormalizedShadowStyle {
  return {
    boxShadow: 'none',
  }
}
