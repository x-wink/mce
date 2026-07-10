import type { WithStyleNone } from '../types'

export type StyleUnit = `${number}%` | number

export type Display = 'inherit' | 'freeform' | 'flex'
export type Direction = 'inherit' | 'ltr' | 'rtl'
export type Overflow = 'hidden' | 'visible'
export type Visibility = 'hidden' | 'visible'
export type FontWeight = 'normal' | 'bold' | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
export type FontStyle = 'normal' | 'italic' | 'oblique' | `oblique ${string}`
export type FontKerning = WithStyleNone<'auto' | 'normal'>
export type TextWrap = 'wrap' | 'nowrap'
export type TextAlign = WithStyleNone<'center' | 'end' | 'left' | 'right' | 'start' | 'justify'>
export type TextTransform = WithStyleNone<'uppercase' | 'lowercase'>
export type TextOrientation = 'mixed' | 'upright' | 'sideways-right' | 'sideways' /* | 'use-glyph-orientation' */
export type TextDecoration = WithStyleNone<'underline' | 'line-through' | 'overline'>
export type VerticalAlign = 'baseline' | 'top' | 'middle' | 'bottom' | 'sub' | 'super' | 'text-top' | 'text-bottom'
export type WritingMode = 'horizontal-tb' | 'vertical-lr' | 'vertical-rl'
export type Align = 'auto' | 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline' | 'space-between' | 'space-around' | 'space-evenly'
export type FlexDirection = 'column' | 'column-reverse' | 'row' | 'row-reverse'
export type FlexWrap = 'nowrap' | 'wrap' | 'Wrap-reverse'
export type Justify = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'
export type Position = 'static' | 'relative' | 'absolute'
export type BorderStyle = WithStyleNone<'dashed' | 'solid'>
export type BoxSizing = 'border-box' | 'content-box'
export type PointerEvents = 'auto' | 'none'

// listStyle
// 对齐 CSS list-style-type，覆盖 pptx buChar/buAutoNum 与 docx w:numFmt。
export type ListStyleType = WithStyleNone<
  // —— 无序（项目符号）——
  | 'disc' // •
  | 'circle' // ◦
  | 'square' // ▪
  // —— 有序：数字 ——
  | 'decimal' // 1 2 3
  | 'decimal-leading-zero' // 01 02
  // —— 有序：字母 ——
  | 'lower-alpha' // a b c
  | 'upper-alpha' // A B C
  // —— 有序：罗马 ——
  | 'lower-roman' // i ii iii
  | 'upper-roman' // I II III
  // —— 希腊 / CJK（中日韩编号）——
  | 'lower-greek'
  | 'cjk-decimal' // 一 二 三
  | 'trad-chinese-informal'
  | 'simp-chinese-informal'
  | 'japanese-informal'
  | 'hiragana'
  | 'katakana'
  // —— 兜底：允许任意项目符号字符串（CSS list-style-type: "–"）——
  | (string & {})
>
export type ListStyleImage = WithStyleNone<string>
export type ListStyleColormap = WithStyleNone<Record<string, string>>
export type ListStyleSize = StyleUnit | `${number}rem` | 'cover'
export type ListStylePosition = 'inside' | 'outside'

// highlight
export type HighlightLine = TextDecoration | 'outline'
export type HighlightImage = WithStyleNone<string>
export type HighlightReferImage = WithStyleNone<string>
export type HighlightColormap = WithStyleNone<Record<string, string>>
export type HighlightSize = StyleUnit | `${number}rem` | 'cover'
export type HighlightThickness = StyleUnit
