import { liveQuery, type Subscription } from "dexie";
import { shallowRef, getCurrentScope, onScopeDispose, watch, type ShallowRef } from "vue";


type Value<T, I> = I extends undefined ? T | undefined : T | I;

type Options<I> = {
  onError?: (error: any) => void;
  initialValue?: I;
  deps?: any;
};


function tryOnScopeDispose(fn: () => void) {
  if (getCurrentScope())
    onScopeDispose(fn);
}

export function useDexieLiveQuery<
  T,
  I = undefined,
>(
  querier: () => T | Promise<T>,
  options?: Options<I>,
): ShallowRef<Value<T, I>> {

  const value = shallowRef<T | I | undefined>(options?.initialValue);

  let subscription: Subscription | undefined = undefined;


  tryOnScopeDispose(() => {
    subscription?.unsubscribe();

    // Set to undefined to avoid calling unsubscribe multiple times on a same subscription
    subscription = undefined;
  });


  function start() {
    subscription?.unsubscribe();

    const observable = liveQuery(querier);

    subscription = observable.subscribe({
      next: result => {
        value.value = result;
      },
      error: error => {
        options?.onError?.(error);
      },
    });    
  }


  if (options?.deps)
    watch(options.deps, () => {
      start();
    }, { immediate: true });
  else
    start();


  return value as ShallowRef<Value<T, I>>;

}
