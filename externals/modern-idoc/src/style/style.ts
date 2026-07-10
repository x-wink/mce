import type { Color } from '../color'
import type { WithStyleNone } from '../types'
import type { NormalizedElementStyle } from './elementStyle'
import type { NormalizedTextStyle } from './textStyle'
import { normalizeColor } from '../color'
import { clearUndef, isNone, normalizeNumber } from '../utils'
import { getDefaultElementStyle } from './elementStyle'
import { getDefaultTextStyle } from './textStyle'

// Style keys typed as a strict `number` (excludes StyleUnit/FontWeight which may
// legitimately be strings). Inputs are coerced defensively; invalid values are
// dropped so the default applies downstream.
const NUMERIC_STYLE_KEYS = [
  // textLineStyle
  'textIndent',
  'lineHeight',
  // textInlineStyle
  'letterSpacing',
  'wordSpacing',
  'fontSize',
  // textStyle
  'textStrokeWidth',
  // elementStyle
  'borderRadius',
  'opacity',
  // transformStyle
  'rotate',
  'scaleX',
  'scaleY',
  'skewX',
  'skewY',
  'translateX',
  'translateY',
  // layoutStyle
  'borderWidth',
  'flex',
  'flexGrow',
  'flexShrink',
] as const

export type FullStyle =
  & NormalizedTextStyle
  & NormalizedElementStyle

export type NormalizedStyle = Partial<FullStyle>

export type StyleObject =
  & NormalizedStyle
  & {
    color?: WithStyleNone<Color>
    backgroundColor?: WithStyleNone<Color>
    borderColor?: WithStyleNone<Color>
    outlineColor?: WithStyleNone<Color>
    shadowColor?: WithStyleNone<Color>
  }

export type Style = StyleObject

export function normalizeStyle(style: Style): NormalizedStyle {
  const normalized: Record<string, any> = clearUndef({
    ...style,
    color: isNone(style.color) ? undefined : normalizeColor(style.color),
    backgroundColor: isNone(style.backgroundColor) ? undefined : normalizeColor(style.backgroundColor),
    borderColor: isNone(style.borderColor) ? undefined : normalizeColor(style.borderColor),
    outlineColor: isNone(style.outlineColor) ? undefined : normalizeColor(style.outlineColor),
    shadowColor: isNone(style.shadowColor) ? undefined : normalizeColor(style.shadowColor),
    textStrokeColor: isNone(style.textStrokeColor) ? undefined : normalizeColor(style.textStrokeColor),
  })
  for (const key of NUMERIC_STYLE_KEYS) {
    if (key in normalized) {
      const value = normalizeNumber(normalized[key])
      if (value === undefined) {
        delete normalized[key]
      }
      else {
        normalized[key] = value
      }
    }
  }
  return normalized as NormalizedStyle
}

export function getDefaultStyle(): FullStyle {
  return {
    ...getDefaultElementStyle(),
    ...getDefaultTextStyle(),
  }
}
