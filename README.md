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

const activeTodoId = useDexieLiveQuery(() => db.keyval.get('activeTodoId').then(res => res?.value));

const activeTodo = useDexieLiveQuery(() => Promise.resolve(
  activeTodoId.value ? db.todos.get(activeTodoId.value) : undefined;
), { deps: activeTodoId });
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
