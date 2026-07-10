export class RawWeakMap<K extends WeakKey = WeakKey, V = any> {
  protected _map = new WeakMap<K, V>()

  // fix: vue reactive object
  protected _toRaw(value: any): any {
    if (value && typeof value === 'object') {
      const raw = value.__v_raw
      if (raw) {
        value = this._toRaw(raw)
      }
    }
    return value
  }

  delete(key: K): boolean {
    return this._map.delete(this._toRaw(key))
  }

  get(key: K): V | undefined {
    return this._map.get(this._toRaw(key))
  }

  has(key: K): boolean {
    return this._map.has(this._toRaw(key))
  }

  set(key: K, value: V): this {
    this._map.set(this._toRaw(key), this._toRaw(value))
    return this
  }
}
