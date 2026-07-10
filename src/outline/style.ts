import type { NormalizedColor } from '../color'
import type { WithStyleNone } from '../types'

export interface NormalizedOutlineStyle {
  outlineWidth: number
  outlineOffset: number
  outlineColor: WithStyleNone<NormalizedColor>
  outlineStyle: string
}

export function getDefaultOutlineStyle(): NormalizedOutlineStyle {
  return {
    outlineWidth: 0,
    outlineOffset: 0,
    outlineColor: 'none',
    outlineStyle: 'none',
  }
}
