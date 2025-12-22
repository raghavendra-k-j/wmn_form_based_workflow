# Actions

## Purpose
Modify observable state. Batches updates (transaction). No reactions run until action completes.

## action
```typescript
// Annotation
class Store {
  value = 0
  constructor() {
    makeObservable(this, { update: action })
  }
  update(v: number) { this.value = v }
}

// Wrapper function (inline handlers)
onClick={action(e => { store.reset() })}

// Named (debugging)
action("resetForm", () => { form.clear() })
```

## action.bound
Auto-binds `this`. Use for callbacks.
```typescript
makeObservable(this, { onClick: action.bound })
```

Or globally:
```typescript
makeAutoObservable(this, {}, { autoBind: true })
```

## runInAction
Immediate one-time action. Use for inline async updates.
```typescript
runInAction(() => {
  store.data = result
  store.loading = false
})
```

## Async Patterns

### Promise handlers wrapped
```typescript
fetchData() {
  this.loading = true
  api.get().then(
    action("success", data => { this.data = data }),
    action("error", err => { this.error = err })
  )
}
```

### async/await + runInAction
```typescript
async fetchData() {
  this.loading = true
  try {
    const data = await api.get()
    runInAction(() => { this.data = data })
  } catch (e) {
    runInAction(() => { this.error = e })
  }
}
```

## flow (Generator Alternative)
```typescript
flow(function* (args) { })
```
Replaces async/await. Auto-wraps yields as action. Cancellable.

```typescript
class Store {
  data = null
  
  constructor() {
    makeObservable(this, { fetchData: flow })
  }
  
  *fetchData(id: string) {
    this.loading = true
    try {
      this.data = yield api.get(id)  // yield instead of await
    } finally {
      this.loading = false
    }
  }
}

// Usage
const cancel = store.fetchData("123")
cancel.cancel() // Cancellable!
```

### flowResult (TypeScript)
```typescript
import { flowResult } from "mobx"
await flowResult(store.fetchData("123"))
```

## flow.bound
```typescript
makeObservable(this, { fetch: flow.bound })
```

## Key Rules
1. Actions are **untracked** (don't create dependencies)
2. Nested actions = single transaction
3. Only prototype methods can be overridden in subclasses
4. Arrow function actions cannot be overridden
