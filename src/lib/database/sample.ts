import type { Database } from "./schema"
import { createDatabase } from "./store"

export const createSampleDatabase = (): Database => {
  const db = createDatabase()
  db.addThing({ type: "superthing" })
  return db
}
