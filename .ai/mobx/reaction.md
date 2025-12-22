# Reactions (Side Effects)

## Purpose
Run side effects when observables change. Bridge reactive → imperative.

## autorun
```typescript
autorun(effect: (reaction) => void, options?)
```
Runs immediately, then re-runs when any read observable changes.

```typescript
const disposer = autorun(() => {
  console.log("Count:", store.count)
})

// Cleanup
disposer()
```

### Tracking Rules
- Tracks observables read **synchronously** during execution
- Does NOT track async reads
- Does NOT track reads inside actions

## reaction
```typescript
reaction(
  () => data,                           // Data function (tracked)
  (data, prev, reaction) => effect,     // Effect function (untracked)
  options?
)
```
Fine-grained control. Only runs when data function result changes.

```typescript
const disposer = reaction(
  () => store.selectedId,
  (id, prevId) => {
    console.log(`Changed from ${prevId} to ${id}`)
    fetchDetails(id)
  }
)
```

**Key difference from autorun**: Effect doesn't run on init (only on change).

## when
```typescript
when(predicate: () => boolean, effect?: () => void, options?)
when(predicate: () => boolean, options?): Promise
```
One-time reaction. Runs effect when predicate becomes true, then disposes.

```typescript
// With effect
when(
  () => store.isReady,
  () => console.log("Ready!")
)

// Promise form (await)
await when(() => store.isLoaded)
doSomething()

// Cancel
const promise = when(() => condition)
promise.cancel()
```

## Always Dispose!
Reactions wait forever. Dispose to prevent memory leaks.

```typescript
// Manual
const disposer = autorun(() => {...})
disposer()

// Inside effect
autorun(reaction => {
  if (done) reaction.dispose()
})

// With AbortSignal
autorun(() => {...}, { signal: controller.signal })
```

## Options

| Option | Applies To | Description |
|--------|-----------|-------------|
| `name` | all | Debug name |
| `fireImmediately` | reaction | Run effect on init |
| `delay` | autorun, reaction | Throttle ms |
| `timeout` | when | Max wait, then reject |
| `signal` | all | AbortSignal for disposal |
| `onError` | all | Error handler |
| `scheduler` | autorun, reaction | Custom scheduling |
| `equals` | reaction | Custom data comparator |

## When to Use Reactions
✅ No direct cause-effect (e.g., auto-save to localStorage)  
❌ Direct cause-effect (use action in event handler)  
❌ Update other observables (use computed instead)  
❌ Chain reactions (merge into one)
