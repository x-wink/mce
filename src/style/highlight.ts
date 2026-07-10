import type {
  HighlightColormap,
  HighlightImage,
  HighlightLine,
  HighlightReferImage,
  HighlightSize,
  HighlightThickness,
} from './types'

export interface NormalizedHighlight {
  image: HighlightImage
  referImage: HighlightReferImage
  colormap: HighlightColormap
  line: HighlightLine
  size: HighlightSize
  thickness: HighlightThickness
}

export interface NormalizedHighlightStyle {
  highlight: Partial<NormalizedHighlight>
  highlightImage: HighlightImage
  highlightReferImage: HighlightReferImage
  highlightColormap: HighlightColormap
  highlightLine: HighlightLine
  highlightSize: HighlightSize
  highlightThickness: HighlightThickness
}

export function getDefaultHighlightStyle(): Required<NormalizedHighlightStyle> {
  return {
    highlight: {},
    highlightImage: 'none',
    highlightReferImage: 'none',
    highlightColormap: 'none',
    highlightLine: 'none',
    highlightSize: 'cover',
    highlightThickness: '100%',
  }
}
