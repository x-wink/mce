export function isEqualObject(a: any, b: any): boolean {
  if (a === b)
    return true

  if (a && b && typeof a === 'object' && typeof b === 'object') {
    const keys = Array.from(new Set([...Object.keys(a), ...Object.keys(b)]))
    return !keys.length
      || keys.every(key => (a as any)[key] === (b as any)[key])
  }

  return false
}

export function getNestedValue(obj: any, path: (string | number)[], fallback?: any): any {
  const last = path.length - 1
  if (last < 0)
    return obj === undefined ? fallback : obj
  for (let i = 0; i < last; i++) {
    if (obj == null) {
      return fallback
    }
    obj = obj[path[i]]
  }
  if (obj == null)
    return fallback
  return obj[path[last]] === undefined ? fallback : obj[path[last]]
}

export function setNestedValue(obj: any, path: (string | number)[], value: any): void {
  const last = path.length - 1
  for (let i = 0; i < last; i++) {
    if (typeof obj[path[i]] !== 'object')
      obj[path[i]] = {}
    obj = obj[path[i]]
  }
  obj[path[last]] = value
}

export function getObjectValueByPath(obj: any, path: string, fallback?: any): any {
  // credit: http://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key#comment55278413_6491621
  if (obj == null || !path || typeof path !== 'string')
    return fallback
  if (obj[path] !== undefined)
    return obj[path]
  path = path.replace(/\[(\w+)\]/g, '.$1') // convert indexes to properties
  path = path.replace(/^\./, '') // strip a leading dot
  return getNestedValue(obj, path.split('.'), fallback)
}

export function setObjectValueByPath(obj: any, path: string, value: any): void {
  if (typeof obj !== 'object' || !path)
    return
  path = path.replace(/\[(\w+)\]/g, '.$1')
  path = path.replace(/^\./, '')
  return setNestedValue(obj, path.split('.'), value)
}
