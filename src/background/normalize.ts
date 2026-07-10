import type { Background, NormalizedBackground } from './types'
import { normalizeFill } from '../fill'
import { pick } from '../utils'

export function normalizeBackground(background: Background): NormalizedBackground {
  if (typeof background === 'string') {
    return {
      ...normalizeFill(background),
    }
  }
  else {
    return {
      ...normalizeFill(background),
      ...pick(background, ['fillWithShape']),
    }
  }
}
