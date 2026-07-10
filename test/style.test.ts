import { describe, expect, it } from 'vitest'
import { normalizeNumber, normalizeStyle } from '../src'

describe('normalizeNumber', () => {
  it('keeps finite numbers', () => {
    expect(normalizeNumber(20)).toBe(20)
    expect(normalizeNumber(-1.5)).toBe(-1.5)
    expect(normalizeNumber(0)).toBe(0)
  })

  it('parses numeric strings', () => {
    expect(normalizeNumber('20')).toBe(20)
    expect(normalizeNumber('20px')).toBe(20)
    expect(normalizeNumber('1.5')).toBe(1.5)
  })

  it('returns fallback for invalid input', () => {
    expect(normalizeNumber('abc')).toBeUndefined()
    expect(normalizeNumber('')).toBeUndefined()
    expect(normalizeNumber(Number.NaN)).toBeUndefined()
    expect(normalizeNumber(Infinity)).toBeUndefined()
    expect(normalizeNumber(null)).toBeUndefined()
    expect(normalizeNumber(undefined)).toBeUndefined()
    expect(normalizeNumber({})).toBeUndefined()
    expect(normalizeNumber('abc', 0)).toBe(0)
  })
})

describe('normalizeStyle numeric coercion', () => {
  it('coerces numeric-string fields to number', () => {
    const style = normalizeStyle({
      textIndent: '20px' as any,
      lineHeight: '1.5' as any,
      fontSize: '16' as any,
      opacity: '0.5' as any,
      rotate: '90' as any,
    })
    expect(style.textIndent).toBe(20)
    expect(style.lineHeight).toBe(1.5)
    expect(style.fontSize).toBe(16)
    expect(style.opacity).toBe(0.5)
    expect(style.rotate).toBe(90)
  })

  it('drops invalid numeric fields so defaults apply', () => {
    const style = normalizeStyle({
      textIndent: 'abc' as any,
      fontSize: {} as any,
    })
    expect('textIndent' in style).toBe(false)
    expect('fontSize' in style).toBe(false)
  })

  it('leaves StyleUnit percentage strings untouched', () => {
    const style = normalizeStyle({ width: '50%', left: 10 })
    expect(style.width).toBe('50%')
    expect(style.left).toBe(10)
  })
})
