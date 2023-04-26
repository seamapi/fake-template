import type { HoistedStoreApi } from "zustand-hoist"

import type { Thing, ThingInitializer } from "lib/models.ts"

export interface DatabaseState {
  thingCount: number
  things: Thing[]
}

export interface DatabaseMethods {
  addThing: (door: ThingInitializer) => Thing
  simulatePowerFailure: (thing_id: string) => void
  update: (t?: number) => void
}

export type State = DatabaseState & DatabaseMethods

export type Database = HoistedStoreApi<State>
