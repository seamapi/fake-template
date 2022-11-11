import create, { StoreApi } from "zustand/vanilla"
import { immer } from "zustand/middleware/immer"
import {
  Database,
  DatabaseMethods,
  DatabaseState,
  Thing,
  ThingInitializer,
} from "lib/types"
import { hoistMethods } from "./utils/hoist-methods"

export const createDb = (): Database =>
  hoistMethods(
    create(
      immer<DatabaseState & DatabaseMethods>((set, get) => ({
        thingCount: 0,
        things: [],

        addThing(thing) {
          set((state) => {
            state.thingCount++
            state.things.push({
              ...thing,
              status: "online",
              thing_id: `thing_${state.thingCount}`,
            })
          })
          return get().things[get().things.length - 1]
        },
        simulatePowerFailure(thing_id) {
          set((state) => {
            const thing = state.things.find((t) => t.thing_id === thing_id)
            if (!thing) throw new Error(`Thing "${thing.thing_id}" not found`)
            thing.status = "offline"
          })
        },
        update() {},
      }))
    )
  )

const globalDb = createDb()

export const getGlobalDb = () => {
  return globalDb
}

export type { Database, DatabaseState, DatabaseMethods }
