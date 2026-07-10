import type { Color, NormalizedColor } from './color'
import type { Fill, NormalizedFill } from './fill'
import type { NormalizedOutline, Outline } from './outline'
import type { NormalizedShadow, Shadow } from './shadow'
import type { WithNone, WithStyleNone } from './types'
import { normalizeColor } from './color'
import { normalizeFill } from './fill'
import { normalizeOutline } from './outline'
import { normalizeShadow } from './shadow'
import { clearUndef, isNone, pick } from './utils'

/**
 * 滤镜/调色。字段与语义对齐 CSS filter 函数（可经 stringifyFilter 无损转成 CSS filter 字符串），
 * 并扩展若干 CSS 无等价、但 OOXML a:blip 支持的项（duotone / biLevel / colorChange）。
 */
export interface Filter {
  /** filter: blur(Npx) */
  blur?: number
  /** filter: brightness(N)，1 = 原值 */
  brightness?: number
  /** filter: contrast(N)，1 = 原值 */
  contrast?: number
  /** filter: grayscale(0~1) */
  grayscale?: number
  /** filter: hue-rotate(Ndeg) */
  hueRotate?: number
  /** filter: invert(0~1) */
  invert?: number
  /** filter: opacity(0~1) */
  opacity?: number
  /** filter: saturate(N)，1 = 原值 */
  saturate?: number
  /** filter: sepia(0~1) */
  sepia?: number
  /** 双色调，[暗, 亮] 两色映射（OOXML a:duotone，无 CSS 等价） */
  duotone?: [Color, Color]
  /** 黑白阈值 0~1（OOXML a:biLevel，无直接 CSS 等价） */
  biLevel?: number
  /** 颜色替换（OOXML a:clrChange，无 CSS 等价） */
  colorChange?: { from: Color, to: Color }
}

export interface NormalizedFilter {
  blur?: number
  brightness?: number
  contrast?: number
  grayscale?: number
  hueRotate?: number
  invert?: number
  opacity?: number
  saturate?: number
  sepia?: number
  duotone?: [NormalizedColor, NormalizedColor]
  biLevel?: number
  colorChange?: { from: NormalizedColor, to: NormalizedColor }
}

export function normalizeFilter(filter: Filter): NormalizedFilter {
  return clearUndef({
    blur: filter.blur,
    brightness: filter.brightness,
    contrast: filter.contrast,
    grayscale: filter.grayscale,
    hueRotate: filter.hueRotate,
    invert: filter.invert,
    opacity: filter.opacity,
    saturate: filter.saturate,
    sepia: filter.sepia,
    duotone: filter.duotone
      ? [normalizeColor(filter.duotone[0]), normalizeColor(filter.duotone[1])] as [NormalizedColor, NormalizedColor]
      : undefined,
    biLevel: filter.biLevel,
    colorChange: filter.colorChange
      ? { from: normalizeColor(filter.colorChange.from), to: normalizeColor(filter.colorChange.to) }
      : undefined,
  })
}

/**
 * 把 Filter 转成 CSS filter 字符串（仅含有 CSS 等价的项）。
 * duotone / biLevel / colorChange 无 CSS filter 形式，自动跳过。
 */
export function stringifyFilter(filter: NormalizedFilter): string {
  const parts: string[] = []
  if (filter.blur !== undefined)
    parts.push(`blur(${filter.blur}px)`)
  if (filter.brightness !== undefined)
    parts.push(`brightness(${filter.brightness})`)
  if (filter.contrast !== undefined)
    parts.push(`contrast(${filter.contrast})`)
  if (filter.grayscale !== undefined)
    parts.push(`grayscale(${filter.grayscale})`)
  if (filter.hueRotate !== undefined)
    parts.push(`hue-rotate(${filter.hueRotate}deg)`)
  if (filter.invert !== undefined)
    parts.push(`invert(${filter.invert})`)
  if (filter.opacity !== undefined)
    parts.push(`opacity(${filter.opacity})`)
  if (filter.saturate !== undefined)
    parts.push(`saturate(${filter.saturate})`)
  if (filter.sepia !== undefined)
    parts.push(`sepia(${filter.sepia})`)
  return parts.join(' ')
}

export interface _EffectV0 {
  transformOrigin?: string
  rotate?: number
  scaleX?: number
  scaleY?: number
  skewX?: number
  skewY?: number
  translateX?: number
  translateY?: number
  shadowOffsetX?: number
  shadowOffsetY?: number
  shadowBlur?: number
  shadowColor?: string
  textStrokeWidth?: number
  textStrokeColor?: string
  color?: string
}

export interface Effect {
  fill?: WithNone<Fill>
  outline?: WithNone<Outline>
  shadow?: WithNone<Shadow>
  transform?: WithStyleNone<string>
  transformOrigin?: string
  /** 滤镜/调色（灰度/双色调/亮度/对比度等），多用于图片元素的整图调色 */
  filter?: Filter
}

export interface NormalizedEffect {
  fill?: NormalizedFill
  outline?: NormalizedOutline
  shadow?: NormalizedShadow
  transform?: string
  transformOrigin?: string
  filter?: NormalizedFilter
}

export const effectFields: (keyof Effect)[] = [
  'fill', 'outline', 'shadow', 'transform', 'transformOrigin', 'filter',
]

function normalizeEffectV0(effect: _EffectV0 & Effect): Effect {
  const _effect = pick(effect, effectFields) as Effect

  const { rotate, scaleX, scaleY, skewX, skewY, translateX, translateY } = effect

  const transforms: string[] = []
  ;(translateX || translateY) && transforms.push(`translate(${translateX || 0}, ${translateY || 0})`)
  rotate && transforms.push(`rotate(${rotate}deg)`)
  ;(scaleX || scaleY) && transforms.push(`scale(${scaleX ?? 1}, ${scaleY ?? 1})`)
  skewX && transforms.push(`skewX(${skewX}deg)`)
  skewY && transforms.push(`skewY(${skewY}deg)`)
  if (transforms.length > 0) {
    _effect.transform = transforms.join(' ')
  }

  if (effect.textStrokeWidth || effect.textStrokeColor) {
    _effect.outline = {
      color: effect.textStrokeColor,
      width: effect.textStrokeWidth,
    }
  }

  if (effect.color) {
    _effect.fill = {
      color: effect.color,
    }
  }

  if (
    effect.shadowOffsetX
    || effect.shadowOffsetY
    || effect.shadowBlur
    || effect.shadowColor
  ) {
    _effect.shadow = {
      offsetX: effect.shadowOffsetX,
      offsetY: effect.shadowOffsetY,
      blur: effect.shadowBlur,
      color: effect.shadowColor,
    }
  }

  return _effect
}

export function normalizeEffect(effect: _EffectV0 & Effect): NormalizedEffect {
  const _effect = normalizeEffectV0(effect)

  return clearUndef({
    fill: isNone(_effect.fill) ? undefined : normalizeFill(_effect.fill),
    outline: isNone(_effect.outline) ? undefined : normalizeOutline(_effect.outline),
    shadow: isNone(_effect.shadow) ? undefined : normalizeShadow(_effect.shadow),
    transform: isNone(_effect.transform) ? undefined : _effect.transform,
    transformOrigin: _effect.transformOrigin,
    filter: _effect.filter ? normalizeFilter(_effect.filter) : undefined,
  })
}
