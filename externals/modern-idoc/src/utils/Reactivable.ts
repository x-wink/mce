import type { PropertyAccessor, PropertyDeclaration } from '../decorators'
import type { ObservableEvents } from './Observable'
import { getDeclarations, propertyOffsetFallback, propertyOffsetGet, propertyOffsetSet } from '../decorators'
import { Observable } from './Observable'

export interface ReactivableEvents extends ObservableEvents {
  updateProperty: [key: string, newValue: any, oldValue: any]
  destroy: []
}

export interface Reactivable {
  on: <K extends keyof ReactivableEvents & string>(event: K, listener: (...args: ReactivableEvents[K]) => void) => this
  once: <K extends keyof ReactivableEvents & string>(event: K, listener: (...args: ReactivableEvents[K]) => void) => this
  off: <K extends keyof ReactivableEvents & string>(event: K, listener: (...args: ReactivableEvents[K]) => void) => this
  emit: <K extends keyof ReactivableEvents & string>(event: K, ...args: ReactivableEvents[K]) => this
}

export class Reactivable extends Observable implements PropertyAccessor {
  protected _propertyAccessor?: PropertyAccessor
  protected _properties: Record<string, any> = {}
  protected _updatedProperties: Record<string, any> = {}
  protected _changedProperties = new Set<string>()
  protected _updatingPromise = Promise.resolve()
  protected _updating = false

  constructor(properties?: Record<string, any>) {
    super()
    this.setProperties(properties)
  }

  isDirty(key?: string): boolean {
    return key
      ? Boolean(this._updatedProperties[key])
      : Object.keys(this._updatedProperties).length > 0
  }

  offsetGetProperty(key: string): any {
    return this._properties[key]
  }

  offsetSetProperty(key: string, value: any): void {
    // undefined 语义为「未设置/回退到 fallback」（offsetGetProperties / getProperty 据此过滤与回退），
    // 故不存为真实值，而是删除键——保持 _properties 不残留 undefined，序列化 / 外部访问器一致。
    if (value === undefined) {
      delete this._properties[key]
    }
    else {
      this._properties[key] = value
    }
  }

  offsetGetProperties(keys?: string[]): Record<string, any> {
    const properties = this._properties
    const allKeys = Object.keys(properties)
    const result: Record<string, any> = {}
    for (let key, value, i = 0; i < allKeys.length; i++) {
      key = allKeys[i]
      value = properties[key]
      if (value !== undefined && (!keys || keys.includes(key))) {
        if (value && typeof value === 'object') {
          if ('toJSON' in value) {
            result[key] = value.toJSON()
          }
          else if (Array.isArray(value)) {
            result[key] = [...value]
          }
          else {
            result[key] = { ...value }
          }
        }
        else {
          result[key] = value
        }
      }
    }
    return result
  }

  offsetSetProperties(properties?: Record<string, any>): this {
    if (properties && typeof properties === 'object') {
      const allKeys = Object.keys(properties)
      for (let key, i = 0; i < allKeys.length; i++) {
        key = allKeys[i]
        this.offsetSetProperty(key, properties[key])
      }
    }
    return this
  }

  getProperty(key: string): any {
    const declaration = this.getPropertyDeclaration(key)

    if (declaration) {
      if (declaration.internal || declaration.alias) {
        return propertyOffsetGet(this, key, declaration)
      }
      else {
        const accessor = this._propertyAccessor

        let result
        if (accessor && accessor.getProperty) {
          result = accessor.getProperty(key)
        }
        else {
          result = this.offsetGetProperty(key)
        }

        return result ?? propertyOffsetFallback(this, key, declaration)
      }
    }

    return undefined
  }

  setProperty(key: string, newValue: any): void {
    const declaration = this.getPropertyDeclaration(key)

    if (declaration) {
      if (declaration.internal || declaration.alias) {
        propertyOffsetSet(this, key, newValue, declaration)
      }
      else {
        // 幂等：原始值未变则不向访问器 / 存储 / 事件传播。
        // 关键在于灭掉 resetProperties() 的副作用——它对所有声明属性 setProperty(key, default)，
        // 而 fallback-only 属性 default 为 undefined；若其原始值本就是 undefined（未设置），这里直接跳过，
        // 不会把 undefined 当「值」广播给外部访问器（如 CRDT 会据此写出畸形结构而崩）。
        const oldRaw = this.offsetGetProperty(key)
        if (Object.is(oldRaw, newValue)) {
          return
        }
        const oldValue = this.getProperty(key)
        this._propertyAccessor?.setProperty?.(key, newValue)
        this.offsetSetProperty(key, newValue)
        this.onUpdateProperty?.(
          key,
          newValue ?? propertyOffsetFallback(this, key, declaration),
          oldValue,
        )
      }
    }
  }

  getProperties(keys?: string[]): Record<string, any> {
    const properties: Record<string, any> = {}
    const declarations = this.getPropertyDeclarations()
    const declarationKeys = Object.keys(declarations)
    for (let i = 0, len = declarationKeys.length; i < len; i++) {
      const key = declarationKeys[i]
      const declaration = declarations[key]
      if (declaration.internal || declaration.alias) {
        continue
      }
      if (!keys || keys.includes(key)) {
        properties[key] = this.getProperty(key)
      }
    }
    return properties
  }

  setProperties(properties?: Record<string, any>): this {
    if (properties && typeof properties === 'object') {
      for (const name in properties) {
        this.setProperty(name, properties[name])
      }
    }
    return this
  }

  resetProperties(): this {
    const declarations = this.getPropertyDeclarations()
    const declarationKeys = Object.keys(declarations)
    for (let i = 0, len = declarationKeys.length; i < len; i++) {
      const key = declarationKeys[i]
      const declaration = declarations[key]
      this.setProperty(
        key,
        typeof declaration.default === 'function'
          ? declaration.default()
          : declaration.default,
      )
    }
    return this
  }

  getPropertyDeclarations(): Record<string, PropertyDeclaration> {
    return getDeclarations(this.constructor)
  }

  getPropertyDeclaration(key: string): PropertyDeclaration | undefined {
    return this.getPropertyDeclarations()[key]
  }

  setPropertyAccessor(accessor?: PropertyAccessor): this {
    const declarations = this.getPropertyDeclarations()
    const items: any[] = []

    if (accessor && accessor.getProperty && accessor.setProperty) {
      const declarationKeys = Object.keys(declarations)
      for (let i = 0, len = declarationKeys.length; i < len; i++) {
        const key = declarationKeys[i]
        const declaration = declarations[key]
        if (declaration.internal || declaration.alias) {
          continue
        }
        const oldValue = this.offsetGetProperty(key)
        const newValue = accessor.getProperty(key)
        if (
          (newValue !== undefined)
          && !Object.is(oldValue, newValue)
        ) {
          this.offsetSetProperty(key, newValue)
          items.push({ key, newValue, oldValue })
        }
      }
    }

    this._propertyAccessor = accessor

    for (let i = 0, len = items.length; i < len; i++) {
      const { key, newValue, oldValue } = items[i]
      this.requestUpdate(key, newValue, oldValue)
    }

    return this
  }

  protected async _nextTick(): Promise<void> {
    if ('requestAnimationFrame' in globalThis) {
      return new Promise(r => (globalThis as any).requestAnimationFrame(r))
    }
    return Promise.resolve()
  }

  protected async _enqueueUpdate(): Promise<void> {
    this._updating = true
    try {
      await this._updatingPromise
    }
    catch (e) {
      Promise.reject(e)
    }
    await this._nextTick()
    if (!this._updating)
      return
    this.onUpdate()
    this._updating = false
  }

  onUpdate(): void {
    this._update(this._updatedProperties)
    this._updatedProperties = {}
  }

  onUpdateProperty(key: string, newValue: any, oldValue: any): void {
    if (!Object.is(newValue, oldValue)) {
      this.requestUpdate(key, newValue, oldValue)
    }
  }

  requestUpdate(key?: string, newValue?: any, oldValue?: any): void {
    if (key !== undefined) {
      this._updatedProperties[key] = oldValue
      this._changedProperties.add(key)
      this._updateProperty(key, newValue, oldValue)
      this.emit('updateProperty', key, newValue, oldValue)
    }

    if (!this._updating) {
      this._updatingPromise = this._enqueueUpdate()
    }
  }

  // eslint-disable-next-line unused-imports/no-unused-vars
  protected _update(changed: Record<string, any>): void {
    /** override */
  }

  // eslint-disable-next-line unused-imports/no-unused-vars
  protected _updateProperty(key: string, newValue: any, oldValue: any): void {
    /** override */
  }

  toJSON(): Record<string, any> {
    return this.offsetGetProperties()
  }

  clone(): this {
    return new (this.constructor as any)(this.toJSON())
  }

  override destroy(): void {
    this.emit('destroy')
    super.destroy()
  }
}
