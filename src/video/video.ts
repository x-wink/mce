export interface NormalizedVideo {
  src: string
}

export type Video =
  | string
  | NormalizedVideo

export function normalizeVideo(video: Video): NormalizedVideo | undefined {
  if (typeof video === 'string') {
    return { src: video }
  }
  else {
    return video
  }
}
