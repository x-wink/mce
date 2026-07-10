import { idGenerator } from '../id'
import { clearUndef, normalizeNumber } from '../utils'

/** 评论位置：相对所属元素原点的偏移。 */
export interface CommentOffset {
  x: number
  y: number
}

/** 评论作者。 */
export interface CommentAuthor {
  id?: string
  name?: string
  color?: string
  /** 姓名缩写（PPTX 作者用；缺省可由 name 推导）。 */
  initials?: string
}

/** 线程中的单条消息（根消息即创建评论，其后为回复）。 */
export interface CommentMessage {
  id?: string
  author?: CommentAuthor
  /** 正文。 */
  body?: string
  /** 创建时间（毫秒时间戳）。 */
  createdAt?: number
}

/**
 * 一条评论线程，作为 {@link Element} 的能力存于 `element.comments`。
 *
 * - 锚点：`offset` 为**相对所属元素原点的偏移**（渲染时经元素世界矩阵还原为屏幕位置），
 *   随该元素及其祖先的平移 / 缩放 / 旋转、复制 / 删除 / 重组自然跟随。
 *   「画布级评论」即挂在页/帧或根元素上的线程 —— 无需区分 canvas / element 锚点。
 * - 归属页（如 PPTX 幻灯片）由元素在文档树中的位置决定，无需显式 pageId。
 * - 线程级数据（offset / resolved）归线程本身；对话内容在 `messages`。
 */
export interface CommentThread {
  id?: string
  /** 锚点偏移（相对所属元素原点）。 */
  offset?: CommentOffset
  /** 是否已解决。 */
  resolved?: boolean
  /** 对话消息（首条为创建，其后为回复）。 */
  messages?: CommentMessage[]
}

export interface NormalizedCommentMessage {
  id: string
  author?: CommentAuthor
  body: string
  createdAt?: number
}

export interface NormalizedCommentThread {
  id: string
  offset?: CommentOffset
  resolved?: boolean
  messages: NormalizedCommentMessage[]
}

function normalizeCommentOffset(offset: CommentOffset): CommentOffset {
  return {
    x: normalizeNumber(offset.x) ?? 0,
    y: normalizeNumber(offset.y) ?? 0,
  }
}

function normalizeCommentAuthor(author: CommentAuthor): CommentAuthor {
  return clearUndef({
    id: author.id,
    name: author.name,
    color: author.color,
    initials: author.initials,
  })
}

export function normalizeCommentMessage(message: CommentMessage): NormalizedCommentMessage {
  return clearUndef({
    id: message.id ?? idGenerator(),
    author: message.author ? normalizeCommentAuthor(message.author) : undefined,
    body: message.body ?? '',
    createdAt: normalizeNumber(message.createdAt),
  }) as NormalizedCommentMessage
}

export function normalizeCommentThread(thread: CommentThread): NormalizedCommentThread {
  return clearUndef({
    id: thread.id ?? idGenerator(),
    offset: thread.offset ? normalizeCommentOffset(thread.offset) : undefined,
    resolved: thread.resolved,
    messages: (thread.messages ?? []).map(normalizeCommentMessage),
  }) as NormalizedCommentThread
}

export function normalizeComments(comments?: CommentThread[]): NormalizedCommentThread[] | undefined {
  if (!comments?.length) {
    return undefined
  }
  return comments.map(normalizeCommentThread)
}
