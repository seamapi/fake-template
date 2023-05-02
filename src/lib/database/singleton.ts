import type { Database } from "./schema"
import { createDatabase } from "./store"

let singletonDatabase

export const getSingletonDatabase = (): Database => {
  singletonDatabase ??= createDatabase()
  return singletonDatabase
}
