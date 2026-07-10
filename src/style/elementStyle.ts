import type { NormalizedBackgroundStyle } from '../background'
import type { NormalizedColor } from '../color'
import type { NormalizedOutlineStyle } from '../outline'
import type { NormalizedShadowStyle } from '../shadow'
import type { WithStyleNone } from '../types'
import type { NormalizedLayoutStyle } from './layoutStyle'
import type { NormalizedTransformStyle } from './transformStyle'
import type { BorderStyle, PointerEvents, Visibility } from './types'
import { getDefaultBackgroundStyle } from '../background'
import { getDefaultOutlineStyle } from '../outline'
import { getDefaultShadowStyle } from '../shadow'
import { getDefaultLayoutStyle } from './layoutStyle'
import { getDefaultTransformStyle } from './transformStyle'

export type NormalizedElementStyle =
  & Partial<NormalizedLayoutStyle>
  & NormalizedTransformStyle
  & NormalizedShadowStyle
  & NormalizedOutlineStyle
  & NormalizedBackgroundStyle
  & {
    // border
    borderRadius: number
    borderColor: WithStyleNone<NormalizedColor>
    borderStyle: BorderStyle
    // other
    visibility: Visibility
    filter: string
    opacity: number
    pointerEvents: PointerEvents
    maskImage: WithStyleNone<string>
  }

export function getDefaultElementStyle(): NormalizedElementStyle {
  return {
    ...getDefaultLayoutStyle(),
    ...getDefaultTransformStyle(),
    ...getDefaultShadowStyle(),
    ...getDefaultBackgroundStyle(),
    ...getDefaultOutlineStyle(),
    // border
    borderRadius: 0,
    borderColor: 'none',
    borderStyle: 'solid',
    // other
    visibility: 'visible',
    filter: 'none',
    opacity: 1,
    pointerEvents: 'auto',
    maskImage: 'none',
  }
}
