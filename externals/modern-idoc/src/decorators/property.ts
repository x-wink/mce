import { getObjectValueByPath, setObjectValueByPath } from '../utils'

export interface PropertyDeclaration {
  [key: string]: unknown
  default?: unknown | (() => unknown)
  fallback?: unknown | (() => unknown)
  alias?: string
  internal?: boolean
  internalKey: symbol | string
}

export interface PropertyAccessor {
  getProperty?: (key: string) => any
  setProperty?: (key: string, newValue: any) => void
  onUpdateProperty?: (key: string, newValue: any, oldValue: any) => void
}

const declarationsSymbol = Symbol.for('declarations')
const initedSymbol = Symbol.for('inited')

export function getDeclarations(constructor: any): Record<string, PropertyDeclaration> {
  let declarations
  if (Object.hasOwn(constructor, declarationsSymbol)) {
    declarations = constructor[declarationsSymbol]
  }
  else {
    const superConstructor = Object.getPrototypeOf(constructor)
    declarations = { ...(superConstructor ? getDeclarations(superConstructor) : {}) }
    constructor[declarationsSymbol] = declarations
  }
  return declarations
}

export function propertyOffsetSet(
  target: any & PropertyAccessor,
  key: string,
  newValue: any,
  declaration: PropertyDeclaration,
): void {
  const {
    alias,
    internalKey,
  } = declaration

  const oldValue = target[key]

  if (alias) {
    setObjectValueByPath(target, alias, newValue)
  }
  else {
    target[internalKey] = newValue
  }

  target.onUpdateProperty?.(
    key,
    newValue ?? propertyOffsetFallback(target, key, declaration),
    oldValue,
  )
}

export function propertyOffsetGet(
  target: any & PropertyAccessor,
  key: string,
  declaration: PropertyDeclaration,
): any {
  const {
    alias,
    internalKey,
  } = declaration

  let result
  if (alias) {
    result = getObjectValueByPath(target, alias)
  }
  else {
    result = target[internalKey]
  }

  result = result ?? propertyOffsetFallback(target, key, declaration)

  return result
}

export function propertyOffsetFallback(
  target: any & PropertyAccessor,
  key: string,
  declaration: PropertyDeclaration,
): any {
  const {
    default: _default,
    fallback,
  } = declaration

  let result: any | undefined

  // init default value
  if (
    _default !== undefined
    && !target[initedSymbol]?.[key]
  ) {
    if (!target[initedSymbol]) {
      target[initedSymbol] = {}
    }
    target[initedSymbol][key] = true
    const defaultValue = typeof _default === 'function' ? _default() : _default
    if (defaultValue !== undefined) {
      target[key] = defaultValue
      result = defaultValue
    }
  }

  if (result === undefined && fallback !== undefined) {
    result = typeof fallback === 'function' ? fallback() : fallback
  }

  return result
}

export function getPropertyDescriptor<V, T extends PropertyAccessor>(
  key: string,
  declaration: PropertyDeclaration,
): {
  get: () => any
  set: (v: any) => void
} {
  function get(this: T): any {
    if (this.getProperty) {
      return this.getProperty(key)
    }
    else {
      return propertyOffsetGet(this, key, declaration)
    }
  }

  function set(this: T, newValue: V): void {
    if (this.setProperty) {
      this.setProperty(key, newValue)
    }
    else {
      propertyOffsetSet(this, key, newValue, declaration)
    }
  }

  return {
    get,
    set,
  }
}

export function defineProperty<V, T extends PropertyAccessor>(
  constructor: any,
  key: string,
  declaration: Partial<PropertyDeclaration> = {},
): void {
  const _declaration: PropertyDeclaration = {
    ...declaration,
    internalKey: Symbol.for(key),
  }

  const declarations = getDeclarations(constructor)
  declarations[key] = _declaration

  const { get, set } = getPropertyDescriptor<V, T>(key, _declaration)

  Object.defineProperty(constructor.prototype, key, {
    get(this: T) {
      return get.call(this)
    },
    set(this: T, newValue: unknown) {
      set.call(this, newValue)
    },
    configurable: true,
    enumerable: true,
  })
}

export function property<V, T extends PropertyAccessor>(
  declaration?: Partial<PropertyDeclaration>,
): PropertyDecorator {
  return function (target: any, key) {
    if (typeof key !== 'string') {
      throw new TypeError('Failed to @property decorator, prop name cannot be a symbol')
    }

    defineProperty<V, T>(target.constructor, key, declaration)
  }
}

export function property2<V, T extends PropertyAccessor>(
  declaration: Partial<PropertyDeclaration> = {},
) {
  return function (
    _: ClassAccessorDecoratorTarget<T, V>,
    context: ClassAccessorDecoratorContext,
  ) {
    const key = context.name

    if (typeof key !== 'string') {
      throw new TypeError('Failed to @property decorator, prop name cannot be a symbol')
    }

    const _declaration: PropertyDeclaration = {
      ...declaration,
      internalKey: Symbol.for(key),
    }

    const descriptor = getPropertyDescriptor(key, _declaration)

    return {
      init(this: T, v: V) {
        const declarations = getDeclarations(this.constructor)
        declarations[key] = _declaration
        descriptor.set.call(this, v)
        return v
      },
      get(this: T) {
        return descriptor.get.call(this)
      },
      set(this: T, newValue: V) {
        descriptor.set.call(this, newValue)
      },
    } as ClassAccessorDecoratorResult<T, V>
  }
}
