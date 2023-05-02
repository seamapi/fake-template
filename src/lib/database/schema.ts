import type { HoistedStoreApi } from "zustand-hoist"

import type { Thing, ThingInitializer } from "lib/models.ts"

export type DatabaseState = {
  _id: number
  things: Thing[]
}

export type DatabaseMethods = {
  addThing: (thing: ThingInitializer) => Thing
  simulatePowerFailure: (thingId: string) => void
  update: (t?: number) => void
}

export type State = DatabaseState & DatabaseMethods

export type Database = HoistedStoreApi<State>
