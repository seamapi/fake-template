import { StoreApi } from "zustand/vanilla"
import { Thing, ThingInitializer } from "./"

export interface DatabaseState {
  thingCount: number
  things: Thing[]
}

export interface DatabaseMethods {
  addThing: (door: ThingInitializer) => Thing
  simulatePowerFailure: (thing_id: string) => any
  update: (t?: number) => any
}

export type Database<DatabaseState, DatabaseMethods> = StoreApi<
  DatabaseState & DatabaseMethods
> &
  DatabaseMethods
