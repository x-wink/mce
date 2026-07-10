import { nanoid as nanoidGenerator } from 'nanoid'

export type IdGenerator = () => string

export const nanoid: IdGenerator = () => {
  return nanoidGenerator(10)
}

export const idGenerator = nanoid
