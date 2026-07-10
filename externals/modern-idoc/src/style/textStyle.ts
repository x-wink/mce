import type { NormalizedColor } from '../color'
import type { WithStyleNone } from '../types'
import type { NormalizedTextInlineStyle } from './textInlineStyle'
import type { NormalizedTextLineStyle } from './textLineStyle'
import { getDefaultTextInlineStyle } from './textInlineStyle'
import { getDefaultTextLineStyle } from './textLineStyle'

export interface NormalizedTextDrawStyle {
  textStrokeWidth: number
  textStrokeColor: WithStyleNone<NormalizedColor>
}

export type NormalizedTextStyle =
  & NormalizedTextLineStyle
  & NormalizedTextInlineStyle
  & NormalizedTextDrawStyle

export function getDefaultTextStyle(): NormalizedTextStyle {
  return {
    ...getDefaultTextLineStyle(),
    ...getDefaultTextInlineStyle(),
    // textStroke
    textStrokeWidth: 0,
    textStrokeColor: 'none',
  }
}
