import type { Toggleable } from '../types'
import { clearUndef, normalizeNumber } from '../utils'

export type ChartType
  = | 'column' | 'bar' | 'line' | 'area'
    | 'pie' | 'doughnut' | 'scatter' | 'radar' | (string & {})

/** 分组方式（柱/条/面/线） */
export type ChartGrouping = 'clustered' | 'stacked' | 'percentStacked' | 'standard'

export type ChartLegend = false | 'top' | 'bottom' | 'left' | 'right'

export interface ChartSeriesObject {
  name?: string
  /** 数值序列（与 chart.categories 对齐） */
  values: number[]
  /** scatter 用：与 values 配对的 x 值 */
  xValues?: number[]
  color?: string
}

export interface ChartAxis {
  title?: string
  min?: number
  max?: number
  /** 是否显示 */
  visible?: boolean
}

export interface ChartObject extends Partial<Toggleable> {
  type?: ChartType
  grouping?: ChartGrouping
  /** 分类标签（共享），如 ["一月","二月"] */
  categories?: string[]
  series?: ChartSeriesObject[]
  title?: string
  legend?: ChartLegend
  categoryAxis?: ChartAxis
  valueAxis?: ChartAxis
}

export type Chart = ChartObject

export interface NormalizedChartSeries {
  name?: string
  values: number[]
  xValues?: number[]
  color?: string
}

export interface NormalizedChart extends Toggleable {
  type: ChartType
  grouping?: ChartGrouping
  categories: string[]
  series: NormalizedChartSeries[]
  title?: string
  legend?: ChartLegend
  categoryAxis?: ChartAxis
  valueAxis?: ChartAxis
}

// 数值序列与 categories 按索引对齐，无效值补 0 而非丢弃，避免错位。
function normalizeValues(values?: number[]): number[] {
  return (values ?? []).map(v => normalizeNumber(v) ?? 0)
}

function normalizeChartSeries(series: ChartSeriesObject): NormalizedChartSeries {
  return clearUndef({
    name: series.name,
    values: normalizeValues(series.values),
    xValues: series.xValues ? normalizeValues(series.xValues) : undefined,
    color: series.color,
  })
}

function normalizeChartAxis(axis: ChartAxis): ChartAxis {
  return clearUndef({
    title: axis.title,
    min: normalizeNumber(axis.min),
    max: normalizeNumber(axis.max),
    visible: axis.visible,
  })
}

export function normalizeChart(chart: Chart): NormalizedChart {
  return clearUndef({
    enabled: chart.enabled ?? true,
    type: chart.type ?? 'column',
    grouping: chart.grouping,
    categories: chart.categories ?? [],
    series: (chart.series ?? []).map(normalizeChartSeries),
    title: chart.title,
    legend: chart.legend,
    categoryAxis: chart.categoryAxis ? normalizeChartAxis(chart.categoryAxis) : undefined,
    valueAxis: chart.valueAxis ? normalizeChartAxis(chart.valueAxis) : undefined,
  })
}
