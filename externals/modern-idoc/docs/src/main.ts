import type { NormalizedDocument, NormalizedElement } from '../../src'
import { normalizeDocument, normalizeElement, normalizeGradient } from '../../src'
import { pdf } from './pdf'
import { pptx } from './pptx'
import './text'
import './reactive'
import './doc'

normalizeElement({} as NormalizedElement)

normalizeDocument({} as NormalizedDocument)

// pdf
console.warn('PDF', normalizeDocument(pdf))

// pptx
console.warn('PPTX', normalizeDocument(pptx))

// linear-gradient
;[
  'linear-gradient(#e66465, #9198e5)',
  // 'linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c)',
  'linear-gradient(to left, #333, #333 50%, #eee 75%, #333 75%)',
  'linear-gradient(217deg, rgba(255, 0, 0, 0.8), rgba(255, 0, 0, 0) 70.71%),'
  + 'linear-gradient(127deg, rgba(0, 255, 0, 0.8), rgba(0, 255, 0, 0) 70.71%),'
  + 'linear-gradient(336deg, rgba(0, 0, 255, 0.8), rgba(0, 0, 255, 0) 70.71%)',

  'linear-gradient(45deg, blue, red)',
  'linear-gradient(to left top, blue, red)',
  'linear-gradient(0deg, blue, green 40%, red)',
  // 'linear-gradient(.25turn, red, 10%, blue)',
  // 'linear-gradient(45deg, red 0 50%, blue 50% 100%)',
].forEach((val) => {
  console.warn(val, normalizeGradient(val))
})

// radial-gradient
;[
  'radial-gradient(#e66465, #9198e5)',
  'radial-gradient(closest-side, #3f87a6, #ebf8e1, #f69d3c)',
  'radial-gradient(circle at 100%, #333, #333 50%, #eee 75%, #333 75%)',
  'radial-gradient(ellipse at top, #e66465, transparent), radial-gradient(ellipse at bottom, #4d9f0c, transparent)',
].forEach((val) => {
  console.warn(val, normalizeGradient(val))
})
