import type { Database } from "./schema.ts"
import { createDatabase } from "./store.ts"

export const createSampleDatabase = (): Database => {
  const db = createDatabase()
  db.addThing({ type: "superthing", status: "online" })
  return db
}
