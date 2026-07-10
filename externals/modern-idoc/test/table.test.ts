import { describe, expect, it } from 'vitest'
import { normalizeElement, normalizeTable } from '../src'

describe('normalizeTable', () => {
  it('normalizes grid geometry and defaults enabled', () => {
    const table = normalizeTable({
      columns: [{ width: 100 }, { width: '120px' as any }],
      rows: [{ height: 40 }],
      cells: [{ row: 0, col: 0 }],
    })
    expect(table.enabled).toBe(true)
    expect(table.columns).toEqual([{ width: 100 }, { width: 120 }])
    expect(table.rows).toEqual([{ height: 40 }])
    expect(table.cells[0].row).toBe(0)
    expect(table.cells[0].col).toBe(0)
    expect(table.cells[0].children).toEqual([])
  })

  it('normalizes cell children as an element subtree', () => {
    const table = normalizeTable({
      cells: [{ row: 0, col: 0, children: [{ text: 'hi' }] }],
    })
    const cell = table.cells[0]
    expect(cell.children).toHaveLength(1)
    expect(cell.children[0].text?.content).toBeDefined()
    expect(typeof cell.children[0].id).toBe('string')
  })

  it('drops invalid numeric fields and falls back row/col to 0', () => {
    const table = normalizeTable({
      columns: [{ width: 'abc' as any }],
      cells: [{ row: 'x' as any, col: undefined as any, rowSpan: 'y' as any }],
    })
    expect('width' in table.columns[0]).toBe(false)
    expect(table.cells[0].row).toBe(0)
    expect(table.cells[0].col).toBe(0)
    expect('rowSpan' in table.cells[0]).toBe(false)
  })

  it('is reachable through normalizeElement', () => {
    const el = normalizeElement({
      table: { cells: [{ row: 0, col: 0 }] },
    })
    expect(el.table?.enabled).toBe(true)
    expect(el.table?.cells).toHaveLength(1)
  })
})
