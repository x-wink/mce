import type { Element, NormalizedElement } from './element'
import { normalizeElement } from './element'

export interface Document extends Element {
  fonts?: any // runtime: modern-font Fonts
}

export interface NormalizedDocument extends NormalizedElement {
  fonts?: any // runtime: modern-font Fonts
}

export function normalizeDocument(doc: Document): NormalizedDocument {
  return normalizeElement(doc)
}
