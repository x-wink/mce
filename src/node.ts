import type { Meta } from './meta'

export interface Node<T = Meta> {
  name?: string
  children?: Node[]
  meta?: T
}
