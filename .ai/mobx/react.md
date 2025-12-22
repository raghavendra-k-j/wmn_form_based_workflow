# React Integration

## Package
```typescript
import { observer } from "mobx-react-lite"  // Function components only
// OR
import { observer } from "mobx-react"        // + Class components
```

## observer HOC
```typescript
const Component = observer((props) => <div>{store.value}</div>)
```
Re-renders when any **read** observable changes. 

### Key Behavior
- Tracks observables read during render
- Unread observables don't cause re-render
- Deep reads work: `todos[0].author.name`
- Auto-optimized: no manual memoization needed

## Local Observable State

### useState + Class
```typescript
const View = observer(() => {
  const [store] = useState(() => new Store())
  return <div>{store.value}</div>
})
```

### useLocalObservable
```typescript
import { useLocalObservable } from "mobx-react-lite"

const View = observer(() => {
  const store = useLocalObservable(() => ({
    count: 0,
    increment() { this.count++ }
  }))
  return <button onClick={store.increment}>{store.count}</button>
})
```

## External State Patterns

### Props
```typescript
const View = observer(({ store }) => <div>{store.value}</div>)
<View store={globalStore} />
```

### Context
```typescript
const StoreContext = createContext<Store | null>(null)

const View = observer(() => {
  const store = useContext(StoreContext)!
  return <div>{store.value}</div>
})
```

### Global
```typescript
const globalStore = new Store()
const View = observer(() => <div>{globalStore.value}</div>)
```

## Observer Component
For callback renders or inline observation:
```typescript
import { Observer } from "mobx-react-lite"

<GridRow onRender={() => (
  <Observer>{() => <td>{todo.title}</td>}</Observer>
)} />
```

## Critical Rules

### 1. Apply observer to ALL components reading observables
```typescript
// Both need observer!
const Parent = observer(() => <Child item={store.item} />)
const Child = observer(({ item }) => <div>{item.name}</div>)
```

### 2. Dereference LATE
```typescript
// ❌ WRONG: secondsPassed read outside observer
<TimerView secondsPassed={timer.secondsPassed} />

// ✅ CORRECT: Pass object, read inside
const TimerView = observer(({ timer }) => 
  <span>{timer.secondsPassed}</span>
)
```

### 3. Non-observer children need plain data
```typescript
const TodoView = observer(({ todo }) => (
  // ❌ GridRow won't react (not observer)
  <GridRow data={todo} />
  
  // ✅ Convert to plain object
  <GridRow data={{ title: todo.title, done: todo.done }} />
  
  // ✅ Or use toJS
  <GridRow data={toJS(todo)} />
))
```

## Troubleshooting

Component not re-rendering?
1. Missing `observer` wrapper?
2. Is value actually `observable`? Check with `isObservable()`
3. Reading observable outside component body?
4. Passing primitives instead of objects?

Debug:
```typescript
import { trace } from "mobx"
trace() // Inside observer, logs dependencies
```
