import { immer } from "zustand/middleware/immer"
import { createStore, type StoreApi } from "zustand/vanilla"
import { hoist } from "zustand-hoist"

import type { Database, State } from "./schema"

export const createDatabase = (): Database => {
  return hoist<StoreApi<State>>(createStore(initializer))
}

const initializer = immer<State>((set, get) => ({
  _id: 0,
  things: [],

  addThing(thing) {
    set((state) => {
      state._id++
    })
    const thingId = `thing_${get()._id}`

    set((state) => {
      state.things.push({
        ...thing,
        thingId,
      })
    })
    const newThing = get().things.find((v) => v.thingId === thingId)
    if (newThing == null) {
      throw new Error("Failed to find new thing in state")
    }

    return newThing
  },

  simulatePowerFailure(thingId) {
    set((state) => {
      const thing = state.things.find((t) => t.thingId === thingId)
      if (thing == null) {
        throw new Error(`Thing "${thingId}" not found`)
      }

      thing.status = "offline"
    })
  },

  update() {},
}))
