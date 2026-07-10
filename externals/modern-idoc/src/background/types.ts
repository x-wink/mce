import type { FillObject, NormalizedFill } from '../fill'

export interface NormalizedBaseBackground {
  fillWithShape?: boolean
}

export type NormalizedBackground =
  & NormalizedFill
  & NormalizedBaseBackground

export type BackgroundObject =
  & FillObject
  & Partial<NormalizedBaseBackground>

export type Background =
  | string
  | BackgroundObject
