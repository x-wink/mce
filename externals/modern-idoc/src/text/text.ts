import type { Effect, NormalizedEffect } from '../effect'
import type { Fill, NormalizedFill } from '../fill'
import type { NormalizedOutline, Outline } from '../outline'
import type { NormalizedStyle, Style, StyleObject } from '../style'
import type { Toggleable } from '../types'
import { normalizeEffect } from '../effect'
import { normalizeFill } from '../fill'
import { normalizeOutline } from '../outline'
import { normalizeStyle } from '../style'
import { clearUndef, isEqualObject } from '../utils'

export type Text =
  | string
  | FlatTextContent[]
  | TextObject

export interface FragmentObject extends StyleObject {
  content: string
  fill?: Fill
  outline?: Outline
}

export interface NormalizedFragment extends NormalizedStyle {
  content: string
  fill?: NormalizedFill
  outline?: NormalizedOutline
}

export interface ParagraphObject extends StyleObject {
  fragments: FragmentObject[]
  fill?: Fill
  outline?: Outline
}

export interface NormalizedParagraph extends NormalizedStyle {
  fragments: NormalizedFragment[]
  fill?: NormalizedFill
  outline?: NormalizedOutline
}

export type FlatTextContent =
  | string
  | FragmentObject
  | ParagraphObject
  | (string | FragmentObject)[]

export type TextContent =
  | FlatTextContent
  | FlatTextContent[]

export type NormalizedTextContent = NormalizedParagraph[]

export interface TextDeformation {
  type: string
  intensities?: number[]
  maxFontSize?: number
}

export interface NormalizedTextDeformation {
  type: string
  intensities?: number[]
  maxFontSize: number
}

export interface TextObject extends Pick<Effect, 'fill' | 'outline'>, Partial<Toggleable> {
  content?: TextContent
  style?: Style
  deformation?: TextDeformation
  measureDom?: any // runtime: HTMLElement
  fonts?: any // runtime: modern-font Fonts
  effects?: Effect[]
}

export interface NormalizedText extends Pick<NormalizedEffect, 'fill' | 'outline'>, Toggleable {
  content: NormalizedTextContent
  style?: NormalizedStyle
  deformation?: NormalizedTextDeformation
  effects?: NormalizedEffect[]
  measureDom?: any // runtime: HTMLElement
  fonts?: any // runtime: modern-font Fonts
}

const CRLF_RE = /\r\n|\n\r|\n|\r/
const NORMALIZE_CRLF_RE = new RegExp(`${CRLF_RE.source}|<br\\/>`, 'g')
// eslint-disable-next-line regexp/no-unused-capturing-group
const IS_CRLF_RE = new RegExp(`^(${CRLF_RE.source})$`)
const NORMALIZED_CRLF = '\n'

export function hasCRLF(content: string): boolean {
  return CRLF_RE.test(content)
}

export function isCRLF(char: string): boolean {
  return IS_CRLF_RE.test(char)
}

export function normalizeCRLF(content: string): string {
  return content.replace(NORMALIZE_CRLF_RE, NORMALIZED_CRLF)
}

export function normalizeTextContent(value: TextContent): NormalizedTextContent {
  const paragraphs: NormalizedParagraph[] = []

  function lastParagraph(): ParagraphObject | undefined {
    return paragraphs[paragraphs.length - 1]
  }

  function addParagraph(styleOption?: Style, fillOption?: Fill, outlineOption?: Outline): NormalizedParagraph {
    const style = styleOption ? normalizeStyle(styleOption) : {}
    const fill = fillOption ? normalizeFill(fillOption) : undefined
    const outline = outlineOption ? normalizeOutline(outlineOption) : undefined
    const paragraph = clearUndef({
      ...style,
      fill,
      outline,
      fragments: [],
    })
    if (paragraphs[paragraphs.length - 1]?.fragments.length === 0) {
      paragraphs[paragraphs.length - 1] = paragraph
    }
    else {
      paragraphs.push(paragraph)
    }
    return paragraph
  }

  function addFragment(content = '', styleOption?: Style, fillOption?: Fill, outlineOption?: Outline): void {
    const style = styleOption ? normalizeStyle(styleOption) : {}
    const fill = fillOption ? normalizeFill(fillOption) : undefined
    const outline = outlineOption ? normalizeOutline(outlineOption) : undefined
    Array.from(content).forEach((c) => {
      if (isCRLF(c)) {
        const { fragments, fill: pFill, outline: pOutline, ...pStyle } = lastParagraph() || addParagraph()
        if (!fragments.length) {
          fragments.push(clearUndef({
            ...style,
            fill,
            outline,
            content: NORMALIZED_CRLF,
          }))
        }
        addParagraph(pStyle, pFill, pOutline)
      }
      else {
        const paragraph = lastParagraph() || addParagraph()
        const fragment = paragraph.fragments[paragraph.fragments.length - 1]
        if (fragment) {
          const { content, fill: fFill, outline: fOutline, ...fStyle } = fragment
          // TODO opz
          if (
            isEqualObject(fill, fFill)
            && isEqualObject(outline, fOutline)
            && isEqualObject(style, fStyle)
          ) {
            fragment.content = `${content}${c}`
            return
          }
        }
        paragraph.fragments.push(clearUndef({
          ...style,
          fill,
          outline,
          content: c,
        }))
      }
    })
  }

  const list: FlatTextContent[] = Array.isArray(value) ? value : [value]
  list.forEach((p) => {
    if (typeof p === 'string') {
      addParagraph()
      addFragment(p)
    }
    else if (isFragmentObject(p)) {
      const { content, fill: fFill, outline: fOutline, ...fStyle } = p
      addParagraph(fStyle, fFill, fOutline)
      addFragment(content)
    }
    else if (isParagraphObject(p)) {
      const { fragments, fill: pFill, outline: pOutline, ...pStyle } = p
      addParagraph(pStyle, pFill, pOutline)
      fragments.forEach((f) => {
        const { content, fill: fFill, outline: fOutline, ...fStyle } = f
        addFragment(content, fStyle, fFill, fOutline)
      })
    }
    else if (Array.isArray(p)) {
      addParagraph()
      p.forEach((f) => {
        if (typeof f === 'string') {
          addFragment(f)
        }
        else if (isFragmentObject(f)) {
          const { content, fill: fFill, outline: fOutline, ...fStyle } = f
          addFragment(content, fStyle, fFill, fOutline)
        }
      })
    }
    else {
      console.warn('Failed to parse text content', p)
    }
  })

  const lastP = lastParagraph()
  if (lastP && !lastP.fragments.length) {
    lastP.fragments.push({
      content: '',
    })
  }

  return paragraphs
}

export function isParagraphObject(value: any): value is ParagraphObject {
  return value
    && typeof value === 'object'
    && 'fragments' in value
    && Array.isArray(value.fragments)
}

export function isFragmentObject(value: any): value is FragmentObject {
  return value
    && typeof value === 'object'
    && 'content' in value
    && typeof value.content === 'string'
}

export function normalizeTextDeformation(deformation: TextDeformation): NormalizedTextDeformation {
  return clearUndef({
    type: deformation.type,
    intensities: deformation.intensities,
    maxFontSize: deformation.maxFontSize ?? 100,
  })
}

export function normalizeText(value: Text): NormalizedText {
  if (typeof value === 'string' || Array.isArray(value)) {
    return {
      enabled: true,
      content: normalizeTextContent(value),
    }
  }
  else {
    return clearUndef({
      enabled: value.enabled ?? true,
      content: normalizeTextContent(value.content ?? ''),
      style: value.style ? normalizeStyle(value.style) : undefined,
      deformation: value.deformation ? normalizeTextDeformation(value.deformation) : undefined,
      measureDom: value.measureDom,
      fonts: value.fonts,
      ...normalizeEffect(value),
      effects: value.effects ? value.effects.map(v => normalizeEffect(v)) : undefined,
    })
  }
}

export function textContentToString(value: TextContent): string {
  return normalizeTextContent(value)
    .map((p) => {
      const content = normalizeCRLF(
        p.fragments.flatMap(f => f.content).join(''),
      )
      if (isCRLF(content)) {
        return ''
      }
      return content
    })
    .join(NORMALIZED_CRLF)
}
