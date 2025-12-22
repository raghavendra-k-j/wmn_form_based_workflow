# MobX AI Reference

## Purpose
Signal-based state management. Transparent reactive programming.

## Core Concepts
```
STATE → ACTION → DERIVATION
  ↓        ↓          ↓
observable  modify   computed/reaction
```

## Mental Model
- **State** = spreadsheet cells (observable)
- **Computed** = formulas (derived, cached)
- **Reactions** = side effects (autorun, observer)
- **Actions** = cell value changes (mutations)

## Key Principles
1. Derivations update automatically + atomically on state change
2. No intermediate values visible during action
3. Computed = lazy, cached, pure, no side effects
4. Actions = batched transactions

## Import Pattern
```typescript
import { makeObservable, makeAutoObservable, observable, action, computed, flow, autorun, reaction, when, runInAction } from "mobx"
import { observer } from "mobx-react-lite"
```

## File Index
- `observable.md` - State creation APIs
- `action.md` - State mutation APIs  
- `computed.md` - Derived values
- `reaction.md` - Side effects (autorun/reaction/when)
- `react.md` - React integration
- `patterns.md` - Common patterns
