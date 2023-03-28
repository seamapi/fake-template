import { StoreApi } from "zustand/vanilla"

type MethodsOnly<T> = {
  [K in keyof T]: T[K] extends Function ? T[K] : never
}

/**
 * Makes it so you can do "db.addThing()" instead of "db.getState().addThing()"
 *
 * TODO move this to a separate package e.g. "zustand-hoist"
 */
export const hoistMethods = <T extends StoreApi<any> = StoreApi<any>>(
  store: T
): T & MethodsOnly<ReturnType<T["getState"]>> => {
  const methods: any = {}
  for (const key in store.getState()) {
    if (typeof store.getState()[key] === "function") {
      store[key] = (...args) => store[key].getState()[key](...args)
    }
  }
  return store as any
}
