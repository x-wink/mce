export type None = undefined | null | 'none'
export type WithNone<T> = T | None
export type WithStyleNone<T> = T | 'none'
export type LineCap = 'butt' | 'round' | 'square'
export type LineJoin = 'miter' | 'round' | 'bevel'
export interface Toggleable {
  enabled: boolean
}
