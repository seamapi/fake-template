import { createDb } from "lib/db"

export default async (t) => {
  const db = createDb()

  const thing = await db.getState().addThing({
    type: "superthing",
  })

  const seed = {
    thing,
    apiKey: "1234",
  }

  return { db, seed }
}
