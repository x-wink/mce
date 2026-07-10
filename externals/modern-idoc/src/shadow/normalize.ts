import type { NormalizedShadow, Shadow } from './types'
import { defaultColor, normalizeColor } from '../color'
import { isNone } from '../utils'

export function normalizeShadow(shadow: Shadow): NormalizedShadow {
  if (typeof shadow === 'string') {
    return {
      enabled: true,
      color: normalizeColor(shadow)!,
    }
  }
  else {
    return {
      ...shadow,
      enabled: shadow.enabled ?? true,
      color: isNone(shadow.color) ? defaultColor : normalizeColor(shadow.color)!,
    }
  }
}
