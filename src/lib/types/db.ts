import { StoreApi, createStore } from "zustand/vanilla"
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

export type Database = StoreApi<DatabaseState & DatabaseMethods> &
  DatabaseMethods

export const createDatabaseStore = () =>
  createStore<DatabaseState>((set, get) => ({
    thingCount: 0,
    things: [],
  }))
