import type { Background, NormalizedBackground } from '../background'
import type { Element, NormalizedElement } from '../element'
import type { NormalizedStyle, Style } from '../style'
import type { Toggleable } from '../types'
import { normalizeBackground } from '../background'
import { normalizeElement } from '../element'
import { normalizeStyle } from '../style'
import { clearUndef, isNone, normalizeNumber } from '../utils'

// ───────────── 列 / 行（只描述几何，后续可扩 hidden 等）─────────────
export interface TableColumnObject {
  width?: number
}

export interface TableRowObject {
  height?: number
}

export interface NormalizedTableColumn {
  width?: number
}

export interface NormalizedTableRow {
  height?: number
}

// ───────────── 单元格 ─────────────
export interface TableCellObject {
  row: number // 0-based
  col: number // 0-based
  rowSpan?: number // 默认 1
  colSpan?: number // 默认 1
  children?: Element[] // 单元格内容（段落/图片/嵌套表格…）
  background?: Background // 单元格填充（纯色/渐变/图片）
  style?: Style // 对齐/垂直对齐/padding/各边框 border* 等
}

export interface NormalizedTableCell {
  row: number // 0-based
  col: number // 0-based
  rowSpan?: number
  colSpan?: number
  children: NormalizedElement[] // 内容统一走元素子树，最通用
  background?: NormalizedBackground
  style?: NormalizedStyle
}

// ───────────── 表格 ─────────────
export interface TableObject extends Partial<Toggleable> {
  columns?: TableColumnObject[]
  rows?: TableRowObject[]
  cells?: TableCellObject[]
}

export type Table = TableObject

export interface NormalizedTable extends Toggleable {
  columns: NormalizedTableColumn[]
  rows: NormalizedTableRow[]
  cells: NormalizedTableCell[] // 行主序；被合并覆盖的格子不出现
}

function normalizeTableColumn(column: TableColumnObject): NormalizedTableColumn {
  return clearUndef({
    width: normalizeNumber(column.width),
  })
}

function normalizeTableRow(row: TableRowObject): NormalizedTableRow {
  return clearUndef({
    height: normalizeNumber(row.height),
  })
}

function normalizeTableCell(cell: TableCellObject): NormalizedTableCell {
  return clearUndef({
    row: normalizeNumber(cell.row) ?? 0,
    col: normalizeNumber(cell.col) ?? 0,
    rowSpan: normalizeNumber(cell.rowSpan),
    colSpan: normalizeNumber(cell.colSpan),
    children: (cell.children ?? []).map(child => normalizeElement(child)),
    background: isNone(cell.background) ? undefined : normalizeBackground(cell.background),
    style: isNone(cell.style) ? undefined : normalizeStyle(cell.style),
  })
}

export function normalizeTable(table: Table): NormalizedTable {
  return clearUndef({
    enabled: table.enabled ?? true,
    columns: (table.columns ?? []).map(normalizeTableColumn),
    rows: (table.rows ?? []).map(normalizeTableRow),
    cells: (table.cells ?? []).map(normalizeTableCell),
  })
}
