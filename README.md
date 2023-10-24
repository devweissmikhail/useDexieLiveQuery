# useDexieLiveQuery
Dexie integration for Vue 3

### Peer dependencies
```shell
npm install @vueuse/core dexie
```

### Examples

```typescript
const todos = useDexieLiveQuery(() => db.todos.toArray(), { initialValue: [] });

const activeTodoId = useDexieLiveQuery(() => db.keyval.get('activeTodoId'));

const activeTodo = useDexieLiveQuery(() => {
  return activeTodoId ? db.keyval.get(activeTodoId.value) : undefined;
}, { deps: activeTodoId });


// Multiple dependencies

const collectionId = ref<number>(1);
const offset = ref<number>(15);
const limit = ref<number>(15);

const todos = useDexieLiveQuery(() =>
  db.todos.orderBy(collectionId.value).offset(offset.value).limit(limit.value).toArray(),
{ initialValue: [], deps: [collectionId, offset, limit] });
```
