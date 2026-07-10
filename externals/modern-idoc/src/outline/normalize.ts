import type { NormalizedOutline, Outline } from './types'
import { normalizeFill } from '../fill'
import { pick } from '../utils'

export function normalizeOutline(outline: Outline): NormalizedOutline {
  if (typeof outline === 'string') {
    return {
      ...normalizeFill(outline),
    }
  }
  else {
    return {
      ...normalizeFill(outline),
      ...pick(outline, ['width', 'style', 'lineCap', 'lineJoin', 'headEnd', 'tailEnd']),
    }
  }
}
