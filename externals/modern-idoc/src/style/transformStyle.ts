import type { WithStyleNone } from '../types'

export interface NormalizedTransformStyle {
  rotate: number
  scaleX: number
  scaleY: number
  skewX: number
  skewY: number
  translateX: number
  translateY: number
  transform: WithStyleNone<string>
  transformOrigin: string
}

export function getDefaultTransformStyle(): NormalizedTransformStyle {
  return {
    rotate: 0,
    scaleX: 1,
    scaleY: 1,
    skewX: 0,
    skewY: 0,
    translateX: 0,
    translateY: 0,
    transform: 'none',
    transformOrigin: 'center',
  }
}
