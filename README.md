# useDexieLiveQuery
[Dexie](https://dexie.org) integration for Vue 3

### Peer dependencies
```shell
npm install dexie
```

## Examples

```typescript
import { useDexieLiveQuery } from './utils/useDexieLiveQuery';


const allTodos = useDexieLiveQuery(
  () => db.todos.toArray(),
  { initialValue: [] }
);


// Loaded status

const { todos, status } = useDexieLiveQuery(
  () => db.todos.toArray().then(todos => ({ todos, loaded: true })),
  { initialValue: { todos: [], loaded: false } }
);
```

### With deps

```typescript
import { useDexieLiveQuery, useDexieLiveQueryWithDeps } from './utils/useDexieLiveQuery';
import { ref } from 'vue';


const activeListId = useDexieLiveQuery(() => db.keyval.get('activeListId').then(res => res?.value));

// Alternative to watch (https://vuejs.org/api/reactivity-core.html#watch),
// but you should return the request function in the callback

const sortedTodos = useDexieLiveQueryWithDeps(activeListId, (activeListId: string | undefined) => {
  return db.todos.where('listId').equals(activeListId).toArray();
}, {
  initialValue: [],
  flush: 'sync',
  /* Supported all watch options, default: immediate: true */
});


// Multiple deps

const offset = ref<number>(15);
const limit = ref<number>(15);

const limitedTodos = useDexieLiveQueryWithDeps(
  [offset, limit],
  ([offset, limit]: [number, number]) => db.todos.offset(offset).limit(limit).toArray(),
  { initialValue: [] }
);
```
