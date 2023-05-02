import type { ExecutionContext } from "ava"

import { createDatabase, type Database, type Thing } from "index.ts"

export type DatabaseFixture = {
  db: Database
  seed: Seed
}

type Seed = {
  thing: Thing
  apiKey: string
}

export const getTestDatabase = async (
  _t: ExecutionContext
): Promise<DatabaseFixture> => {
  const db = createDatabase()

  const thing = db.addThing({
    type: "superthing",
    status: "online",
  })

  const seed = {
    thing,
    apiKey: "1234",
  }

  return { db, seed }
}
