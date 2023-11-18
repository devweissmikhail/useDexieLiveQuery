# useDexieLiveQuery
[Dexie](https://dexie.org) integration for Vue 3

### Peer dependencies
```shell
npm install dexie
```

## Examples

```typescript
import useDexieLiveQuery from './utils/useDexieLiveQuery';


const todos = useDexieLiveQuery(
  () => db.todos.toArray(),
  { initialValue: [] }
);

const kvActiveTodoId = useDexieLiveQuery(() => db.keyval.get('activeTodoId').then(res => res?.value));

const activeTodo = useDexieLiveQuery(
  () => kvActiveTodoId.value ? db.todos.get(kvActiveTodoId.value) : undefined,
  { deps: kvActiveTodoId }
);
```

### Multiple dependencies

```typescript
const collectionId = useDexieLiveQuery(() => db.keyval.get('collectionId').then(res => res?.value));
const offset = ref<number>(15);
const limit = ref<number>(15);

const todos = useDexieLiveQuery(
  () => db.todos.orderBy(collectionId.value).offset(offset.value).limit(limit.value).toArray(),
  { initialValue: [], deps: [collectionId, offset, limit] }
);
```

### Loaded status

```typescript
const { todos, loaded } = useDexieLiveQuery(
  () => db.todos.toArray().then(todos => ({ todos, loaded: true })),
  { initialValue: { todos: [], loaded: false } }
);
```
