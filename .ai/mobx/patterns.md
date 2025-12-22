# Common Patterns

## Store Class Pattern
```typescript
class TodoStore {
  todos: Todo[] = []
  filter: "all" | "active" | "done" = "all"

  constructor() {
    makeAutoObservable(this)
  }

  // Computed
  get filtered() {
    switch (this.filter) {
      case "active": return this.todos.filter(t => !t.done)
      case "done": return this.todos.filter(t => t.done)
      default: return this.todos
    }
  }

  get stats() {
    return {
      total: this.todos.length,
      done: this.todos.filter(t => t.done).length
    }
  }

  // Actions
  add(title: string) {
    this.todos.push(new Todo(title))
  }

  remove(todo: Todo) {
    this.todos.splice(this.todos.indexOf(todo), 1)
  }

  // Async
  *fetch() {
    const data = yield api.getTodos()
    this.todos = data.map(d => new Todo(d.title, d.done))
  }
}
```

## Domain Model Pattern
```typescript
class Todo {
  id = crypto.randomUUID()
  title: string
  done = false
  
  constructor(title: string, done = false) {
    makeAutoObservable(this, { id: false })
    this.title = title
    this.done = done
  }
  
  toggle() {
    this.done = !this.done
  }
}
```

## Root Store Pattern
```typescript
class RootStore {
  todoStore: TodoStore
  userStore: UserStore
  
  constructor() {
    this.todoStore = new TodoStore(this)
    this.userStore = new UserStore(this)
  }
}

class TodoStore {
  constructor(private root: RootStore) {
    makeAutoObservable(this)
  }
  
  get currentUserTodos() {
    return this.todos.filter(t => 
      t.userId === this.root.userStore.currentUser?.id
    )
  }
}
```

## Context Provider Pattern
```typescript
const StoreContext = createContext<RootStore | null>(null)

export const useStore = () => {
  const store = useContext(StoreContext)
  if (!store) throw new Error("Missing StoreProvider")
  return store
}

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [store] = useState(() => new RootStore())
  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  )
}
```

## Loading State Pattern
```typescript
type LoadState = "idle" | "loading" | "done" | "error"

class DataStore {
  data: Data | null = null
  state: LoadState = "idle"
  error: Error | null = null

  constructor() {
    makeAutoObservable(this)
  }

  get isLoading() { return this.state === "loading" }
  get isError() { return this.state === "error" }

  *fetch() {
    this.state = "loading"
    this.error = null
    try {
      this.data = yield api.get()
      this.state = "done"
    } catch (e) {
      this.error = e as Error
      this.state = "error"
    }
  }
}
```

## Form Store Pattern
```typescript
class FormStore {
  values = { name: "", email: "" }
  touched = { name: false, email: false }
  submitting = false

  constructor() {
    makeAutoObservable(this)
  }

  get errors() {
    return {
      name: this.values.name ? null : "Required",
      email: this.values.email.includes("@") ? null : "Invalid"
    }
  }

  get isValid() {
    return Object.values(this.errors).every(e => !e)
  }

  setValue(field: keyof typeof this.values, value: string) {
    this.values[field] = value
  }

  setTouched(field: keyof typeof this.touched) {
    this.touched[field] = true
  }

  *submit() {
    if (!this.isValid) return
    this.submitting = true
    try {
      yield api.submit(this.values)
    } finally {
      this.submitting = false
    }
  }
}
```

## Subclass Pattern
```typescript
class BaseStore {
  loading = false
  
  constructor() {
    makeObservable(this, {
      loading: observable,
      setLoading: action
    })
  }
  
  setLoading(v: boolean) {
    this.loading = v
  }
}

class ChildStore extends BaseStore {
  items: string[] = []
  
  constructor() {
    super()
    makeObservable(this, {
      items: observable,
      setLoading: override  // Required for overrides
    })
  }
  
  setLoading(v: boolean) {
    super.setLoading(v)
    console.log("Loading:", v)
  }
}
```

## TypeScript Config
Required in `tsconfig.json`:
```json
{
  "compilerOptions": {
    "useDefineForClassFields": true
  }
}
```
