# Computed Values

## Purpose
Derive information from observables. Cached. Re-evaluates only when dependencies change.

## Syntax
```typescript
class Store {
  items: Item[] = []
  
  constructor() {
    makeObservable(this, {
      items: observable,
      count: computed,
      isEmpty: computed
    })
  }
  
  get count() { return this.items.length }
  get isEmpty() { return this.count === 0 }
}
```

## Behavior
- **Lazy**: Only computed when read
- **Cached**: Same result returned if deps unchanged
- **Suspended**: When not observed, garbage collected
- **Transitive**: Computed can depend on other computed

## computed.struct
Skip notifications if result structurally equal.
```typescript
makeObservable(this, { 
  filtered: computed.struct 
})
```

## Standalone Computed
```typescript
import { computed } from "mobx"

const total = computed(() => store.price * store.qty)
total.get() // Read value
```

## Options
```typescript
computed(fn, {
  name: "debugName",
  equals: (a, b) => a.id === b.id,  // Custom comparator
  requiresReaction: true,            // Error if read outside reaction
  keepAlive: true                    // Don't suspend when unobserved
})
```

## Built-in Comparers
```typescript
import { comparer } from "mobx"

comparer.identity   // ===
comparer.default    // === but NaN === NaN
comparer.structural // Deep equality
comparer.shallow    // Shallow equality
```

## Rules
1. **Pure**: No side effects
2. **No new observables**: Don't create observables inside
3. **No non-observable deps**: Only depend on observables
4. **Deterministic**: Same inputs = same output

## Computed with Arguments
Use `computedFn` from `mobx-utils`:
```typescript
import { computedFn } from "mobx-utils"

findById = computedFn((id: string) => {
  return this.items.find(x => x.id === id)
})
```
