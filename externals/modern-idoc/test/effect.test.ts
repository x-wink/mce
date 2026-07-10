import { describe, expect, it } from 'vitest'
import { normalizeEffect, normalizeFilter, stringifyFilter } from '../src'

describe('normalizeEffect', () => {
  it('normalizes filter (css-aligned values, colors -> hex8, drops undefined)', () => {
    const effect = normalizeEffect({
      filter: {
        grayscale: 1,
        brightness: 1.2,
        contrast: 0.9,
        duotone: ['#000', '#fff'],
        colorChange: { from: '#FF0000', to: '#00FF00' },
      },
    })
    expect(effect.filter).toEqual({
      grayscale: 1,
      brightness: 1.2,
      contrast: 0.9,
      duotone: ['#000000ff', '#ffffffff'],
      colorChange: { from: '#ff0000ff', to: '#00ff00ff' },
    })
  })

  it('omits filter when not provided', () => {
    expect(normalizeEffect({}).filter).toBeUndefined()
  })

  it('normalizes fill/outline/transform alongside filter', () => {
    const effect = normalizeEffect({
      fill: { color: '#f00' },
      outline: { color: '#000', width: 4 },
      transform: 'translate(2, 3)',
      filter: { grayscale: 1 },
    })
    expect(effect).toEqual({
      fill: { enabled: true, color: '#ff0000ff' },
      outline: { enabled: true, color: '#000000ff', width: 4 },
      transform: 'translate(2, 3)',
      filter: { grayscale: 1 },
    })
  })
})

describe('stringifyFilter', () => {
  it('renders css-equivalent functions, skips ooxml-only ones', () => {
    const filter = normalizeFilter({
      blur: 2,
      brightness: 1.2,
      contrast: 0.9,
      grayscale: 0.5,
      hueRotate: 90,
      invert: 1,
      saturate: 2,
      sepia: 0.3,
      duotone: ['#000', '#fff'], // 无 CSS 等价，跳过
    })
    expect(stringifyFilter(filter)).toBe(
      'blur(2px) brightness(1.2) contrast(0.9) grayscale(0.5) hue-rotate(90deg) invert(1) saturate(2) sepia(0.3)',
    )
  })
})
