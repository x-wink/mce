import { describe, expect, it } from 'vitest'
import { normalizeImageFill } from '../src'

describe('normalizeImageFill', () => {
  it('normalizes a plain url string', () => {
    expect(normalizeImageFill('a.png')).toEqual({ image: 'a.png' })
  })

  it('keeps drawingml-aligned fields', () => {
    const fill = normalizeImageFill({
      image: 'a.png',
      cropRect: { left: -0.1 },
      opacity: 0.5,
      rotateWithShape: true,
    })
    expect(fill).toEqual({
      image: 'a.png',
      cropRect: { left: -0.1 },
      opacity: 0.5,
      rotateWithShape: true,
    })
  })
})
