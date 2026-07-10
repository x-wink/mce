export interface NormalizedAudio {
  src: string
}

export type Audio =
  | string
  | NormalizedAudio

export function normalizeAudio(audio: Audio): NormalizedAudio | undefined {
  if (typeof audio === 'string') {
    return { src: audio }
  }
  else {
    return audio
  }
}
