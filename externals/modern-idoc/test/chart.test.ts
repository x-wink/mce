import { describe, expect, it } from 'vitest'
import { normalizeChart, normalizeElement } from '../src'

describe('normalizeChart', () => {
  it('applies defaults (enabled, type, categories, series)', () => {
    const chart = normalizeChart({})
    expect(chart.enabled).toBe(true)
    expect(chart.type).toBe('column')
    expect(chart.categories).toEqual([])
    expect(chart.series).toEqual([])
  })

  it('normalizes series values defensively (invalid -> 0, keeps length)', () => {
    const chart = normalizeChart({
      categories: ['一月', '二月', '三月'],
      series: [{ name: 'A', values: [1, '2' as any, 'x' as any], color: '#f00' }],
    })
    expect(chart.series[0].values).toEqual([1, 2, 0])
    expect(chart.series[0].name).toBe('A')
  })

  it('keeps legend false and drops empty optionals', () => {
    const chart = normalizeChart({ type: 'pie', legend: false })
    expect(chart.legend).toBe(false)
    expect('grouping' in chart).toBe(false)
    expect('title' in chart).toBe(false)
  })

  it('normalizes axis min/max defensively', () => {
    const chart = normalizeChart({
      valueAxis: { title: 'Y', min: '0' as any, max: 'bad' as any, visible: true },
    })
    expect(chart.valueAxis).toEqual({ title: 'Y', min: 0, visible: true })
  })

  it('is reachable through normalizeElement', () => {
    const el = normalizeElement({ chart: { type: 'line', series: [{ values: [1, 2] }] } })
    expect(el.chart?.enabled).toBe(true)
    expect(el.chart?.type).toBe('line')
    expect(el.chart?.series[0].values).toEqual([1, 2])
  })
})
