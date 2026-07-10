import type { FillObject, NormalizedFill } from '../fill'
import type { LineCap, LineJoin, WithNone } from '../types'

export type LineEndType = 'oval' | 'stealth' | 'triangle' | 'arrow' | 'diamond'
export type LineEndSize = 'sm' | 'md' | 'lg'
export type OutlineStyle = 'dashed' | 'solid' | string

export interface TailEnd {
  type: LineEndType
  width?: WithNone<LineEndSize>
  height?: WithNone<LineEndSize>
}

export interface HeadEnd {
  type: LineEndType
  width?: WithNone<LineEndSize>
  height?: WithNone<LineEndSize>
}

export interface NormalizedBaseOutline {
  width?: number
  style?: OutlineStyle
  lineCap?: LineCap
  lineJoin?: LineJoin
  headEnd?: HeadEnd
  tailEnd?: TailEnd
}

export type OutlineObject =
  & FillObject
  & Partial<NormalizedBaseOutline>

export type NormalizedOutline =
  & NormalizedFill
  & NormalizedBaseOutline

export type Outline =
  | string
  | OutlineObject
