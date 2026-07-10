import type { ListStyleColormap, ListStyleImage, ListStylePosition, ListStyleSize, ListStyleType } from './types'

export interface NormalizedListStyle {
  type: ListStyleType
  image: ListStyleImage
  colormap: ListStyleColormap
  size: ListStyleSize
  position: ListStylePosition
}

export interface NormalizedListStyleStyle {
  listStyle: Partial<NormalizedListStyle>
  listStyleType: ListStyleType
  listStyleImage: ListStyleImage
  listStyleColormap: ListStyleColormap
  listStyleSize: ListStyleSize
  listStylePosition: ListStylePosition
}

export function getDefaultListStyleStyle(): NormalizedListStyleStyle {
  return {
    listStyle: {},
    listStyleType: 'none',
    listStyleImage: 'none',
    listStyleColormap: 'none',
    listStyleSize: 'cover',
    listStylePosition: 'outside',
  }
}
