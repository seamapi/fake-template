import create, { StoreApi } from "zustand/vanilla"
import { immer } from "zustand/middleware/immer"
import { Thing, ThingInitializer } from "lib/types"

export interface DatabaseState {
  thingCount: number
  things: Array<Thing>
  addThing: (door: ThingInitializer) => Thing
  simulatePowerFailure: (thing_id: string) => any
  update: (t?: number) => any
}

export type Database = StoreApi<DatabaseState>

export const createDb = (): Database =>
  create(
    immer<DatabaseState>((set, get) => ({
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

const globalDb = createDb()

export const getGlobalDb = () => {
  return globalDb
}
