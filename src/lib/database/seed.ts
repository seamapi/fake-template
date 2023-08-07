import type { Database } from "./schema.ts"

export interface Seed {
  thing_1: string
  api_key: string
}

export const seedDatabase = (db: Database): Seed => {
  const thing = db.addThing({
    type: "superthing",
    status: "online",
  })

  return {
    thing_1: thing.thingId,
    api_key: "1234",
  }
}
