import { describe, expect, it } from 'vitest'
import { defineProperty, Reactivable } from '../src'

// fallback-only（default 为 undefined）+ 有 default 的两类属性
class Foo extends Reactivable {
  declare mode: string
  declare size: number
}
defineProperty(Foo, 'mode', { fallback: 'inherit' })
defineProperty(Foo, 'size', { default: 10 })

function track(obj: Reactivable): Array<[string, any]> {
  const calls: Array<[string, any]> = []
  obj.setPropertyAccessor({
    getProperty: (k: string) => obj.offsetGetProperty(k),
    setProperty: (k: string, v: any) => calls.push([k, v]),
  })
  return calls
}

describe('reactivable: 幂等 setProperty 不广播 undefined', () => {
  it('resetProperties 不向访问器广播 fallback-only 属性的 undefined', () => {
    const foo = new Foo()
    const calls = track(foo)
    calls.length = 0
    foo.resetProperties()
    // 未设置过的 fallback-only 属性，重置为 undefined 应被跳过（不触达访问器）
    expect(calls.find(([k]) => k === 'mode')).toBeUndefined()
    // 也不应有任何 undefined 值流向访问器
    expect(calls.filter(([, v]) => v === undefined)).toEqual([])
  })

  it('相同值重复写入被跳过（幂等）', () => {
    const foo = new Foo()
    const calls = track(foo)
    foo.mode = 'disabled'
    foo.mode = 'disabled'
    expect(calls.filter(([k]) => k === 'mode')).toEqual([['mode', 'disabled']])
  })

  it('真实「取消设置」(set→undefined) 仍会传播为 undefined（访问器据此删除）', () => {
    const foo = new Foo()
    const calls = track(foo)
    foo.mode = 'disabled'
    calls.length = 0
    foo.mode = undefined as any
    expect(calls).toEqual([['mode', undefined]])
    // 内部 _properties 不残留 undefined 键
    expect('mode' in (foo as any)._properties).toBe(false)
    // getter 回落到 fallback
    expect(foo.mode).toBe('inherit')
  })

  it('offsetGetProperties 不含被取消的键', () => {
    const foo = new Foo()
    foo.mode = 'disabled'
    expect(foo.offsetGetProperties().mode).toBe('disabled')
    foo.mode = undefined as any
    expect('mode' in foo.offsetGetProperties()).toBe(false)
  })
})
