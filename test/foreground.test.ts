import { describe, expect, it } from 'vitest'
import { normalizeForeground } from '../src'

describe('normalizeForeground', () => {
  it('normalizes a plain url string', () => {
    expect(normalizeForeground('a.png')).toEqual({ enabled: true, image: 'a.png' })
  })

  it('keeps fillWithShape', () => {
    expect(normalizeForeground({ image: 'a.png', fillWithShape: true })).toEqual({
      enabled: true,
      image: 'a.png',
      fillWithShape: true,
    })
  })

  it('keeps image pipelines (normalized via fill layer)', () => {
    const fg = normalizeForeground({
      image: 'a.png',
      fillWithShape: true,
      imagePipelines: [
        { name: 'rembg' },
        { name: 'duotone', params: { dark: '#000', light: '#fff' } },
      ],
    })
    expect(fg?.imagePipelines).toEqual([
      { name: 'rembg' },
      { name: 'duotone', params: { dark: '#000', light: '#fff' } },
    ])
  })

  it('omits imagePipelines when not provided', () => {
    expect(normalizeForeground({ image: 'a.png' })?.imagePipelines).toBeUndefined()
  })
})
