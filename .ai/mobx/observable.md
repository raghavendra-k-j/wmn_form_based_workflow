# Observable State

## makeObservable
```typescript
makeObservable(target, annotations?, options?)
```
Manual annotation mapping. Use in constructor.

```typescript
class Store {
  value = 0
  
  constructor() {
    makeObservable(this, {
      value: observable,
      double: computed,
      increment: action,
      fetch: flow
    })
  }
  
  get double() { return this.value * 2 }
  increment() { this.value++ }
  *fetch() { this.value = yield api.get() }
}
```

## makeAutoObservable
```typescript
makeAutoObservable(target, overrides?, options?)
```
Auto-infers annotations. **Cannot use with subclasses.**

Inference rules:
- Properties → `observable`
- Getters → `computed`
- Setters → `action`
- Functions → `autoAction`
- Generators → `flow`

```typescript
class Store {
  value = 0
  
  constructor() {
    makeAutoObservable(this)
  }
  
  get double() { return this.value * 2 }
  increment() { this.value++ }
}
```

Override exclusion:
```typescript
makeAutoObservable(this, { id: false }) // id not tracked
```

## Annotations Table

| Annotation | Description |
|------------|-------------|
| `observable` | Deep observable, auto-converts nested |
| `observable.ref` | Only reassignment tracked, value untouched |
| `observable.shallow` | Collection observable, contents not |
| `observable.struct` | Ignores structurally equal assignments |
| `action` | State modifier |
| `action.bound` | Auto-bound to instance |
| `computed` | Cached derived getter |
| `computed.struct` | Structural equality for cache |
| `flow` | Generator-based async |
| `flow.bound` | Auto-bound flow |
| `false` | Exclude from observation |
| `override` | For subclass overrides |

## Options
```typescript
{
  autoBind: true,      // action.bound/flow.bound default
  deep: false,         // observable.ref default
  name: "StoreName"    // debug name
}
```

## Observable Collections

```typescript
// Array
const arr = observable.array([1, 2, 3])
arr.clear()           // Remove all
arr.replace([4, 5])   // Replace all
arr.remove(value)     // Remove by value

// Map
const map = observable.map(new Map())
map.merge(values)     // Copy entries
map.replace(values)   // Replace all

// Set
const set = observable.set(new Set())

// Box (primitive wrapper)
const box = observable.box("value")
box.get()
box.set("new")
```

## Conversion to Plain JS
```typescript
const plain = { ...observableObject }
const plainArr = observableArray.slice()
const plainMap = new Map(observableMap)

// Deep recursive
import { toJS } from "mobx"
const deep = toJS(observableTree)
```
