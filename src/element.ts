import type { Audio, NormalizedAudio } from './audio'
import type { Background, NormalizedBackground } from './background'
import type { Chart, NormalizedChart } from './chart'
import type { CommentThread, NormalizedCommentThread } from './comment'
import type { Connection, NormalizedConnection } from './connection'
import type { Effect, NormalizedEffect } from './effect'
import type { Foreground, NormalizedForeground } from './foreground'
import type { Meta } from './meta'
import type { Node } from './node'
import type { NormalizedShape, Shape } from './shape'
import type { NormalizedStyle, Style } from './style'
import type { NormalizedTable, Table } from './table'
import type { NormalizedText, Text } from './text'
import type { WithNone } from './types'
import type { NormalizedVideo, Video } from './video'
import { normalizeAudio } from './audio'
import { normalizeBackground } from './background'
import { normalizeChart } from './chart'
import { normalizeComments } from './comment'
import { normalizeConnection } from './connection'
import { normalizeEffect } from './effect'
import { normalizeForeground } from './foreground'
import { idGenerator } from './id'
import { normalizeShape } from './shape'
import { normalizeStyle } from './style'
import { normalizeTable } from './table'
import { normalizeText } from './text'
import { clearUndef, isNone } from './utils'
import { normalizeVideo } from './video'

export interface Element<T = Meta> extends Effect, Omit<Node<T>, 'children'> {
  id?: string
  style?: WithNone<Style>
  text?: WithNone<Text>
  background?: WithNone<Background>
  shape?: WithNone<Shape>
  foreground?: WithNone<Foreground>
  video?: WithNone<Video>
  audio?: WithNone<Audio>
  connection?: WithNone<Connection>
  table?: WithNone<Table>
  chart?: WithNone<Chart>
  /** 评论线程。挂在哪个元素即归属哪个元素 / 页；offset 相对该元素原点。 */
  comments?: CommentThread[]
  children?: Element[]
}

export interface NormalizedElement<T = Meta> extends NormalizedEffect, Omit<Node<T>, 'children'> {
  id: string
  style?: NormalizedStyle
  text?: NormalizedText
  background?: NormalizedBackground
  shape?: NormalizedShape
  foreground?: NormalizedForeground
  video?: NormalizedVideo
  audio?: NormalizedAudio
  connection?: NormalizedConnection
  table?: NormalizedTable
  chart?: NormalizedChart
  comments?: NormalizedCommentThread[]
  children?: NormalizedElement[]
}

export function normalizeElement<T = Meta>(element: Element<T>): NormalizedElement<T> {
  return clearUndef({
    id: element.id ?? idGenerator(),
    style: isNone(element.style) ? undefined : normalizeStyle(element.style),
    text: isNone(element.text) ? undefined : normalizeText(element.text),
    background: isNone(element.background) ? undefined : normalizeBackground(element.background),
    shape: isNone(element.shape) ? undefined : normalizeShape(element.shape),
    foreground: isNone(element.foreground) ? undefined : normalizeForeground(element.foreground),
    video: isNone(element.video) ? undefined : normalizeVideo(element.video),
    audio: isNone(element.audio) ? undefined : normalizeAudio(element.audio),
    connection: isNone(element.connection) ? undefined : normalizeConnection(element.connection),
    table: isNone(element.table) ? undefined : normalizeTable(element.table),
    chart: isNone(element.chart) ? undefined : normalizeChart(element.chart),
    comments: normalizeComments(element.comments),
    ...normalizeEffect(element),
    children: element.children?.map(child => normalizeElement(child)),
  })
}
