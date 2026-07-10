import { getDeclarations, property, Reactivable } from '../../src'

class TestObject1 extends Reactivable {
  @property({ fallback: 1 }) declare test1: number
  @property({ fallback: 1 }) declare test2: number
  @property({ default: () => ({}) }) declare meta: Record<string, any>
}

class TestObject2 extends TestObject1 {
  @property({ fallback: 2 }) declare test2: number
  @property() declare test3: number

  override onUpdateProperty(key: string, newValue: unknown, oldValue: unknown): void {
    console.warn('[reactive] onUpdateProperty', key, newValue, oldValue)
  }
}

const test = new TestObject2()
test.test1 = 2
test.meta.title = 2

console.warn('[reactive]', test)
console.warn('[reactive] meta', test.meta)
console.warn('[reactive] getDeclarations', getDeclarations(TestObject1))
console.warn('[reactive] getDeclarations', getDeclarations(TestObject2))
