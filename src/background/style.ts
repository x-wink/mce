import type { NormalizedColor } from '../color'
import type { WithStyleNone } from '../types'

export type BackgroundSize =
  | 'contain' | 'cover' | string
  // custom
  | 'stretch' | 'rigid'

export interface NormalizedBackgroundStyle {
  backgroundImage: WithStyleNone<string>
  backgroundSize: BackgroundSize
  backgroundColor: WithStyleNone<NormalizedColor>
  backgroundColormap: WithStyleNone<Record<string, string>>
}

export function getDefaultBackgroundStyle(): NormalizedBackgroundStyle {
  return {
    backgroundImage: 'none',
    backgroundSize: 'auto, auto',
    backgroundColor: 'none',
    backgroundColormap: 'none',
  }
}
