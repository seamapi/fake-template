import { createDb } from "../../lib/db"

export default async (t) => {
  const db = await createDb()

  const user = await db.addUser({
    email: "jane@example.com",
    password: "1234",
  })

  const device = await db.addDevice(user, {})

  const seed = {
    apiKey: "abc123",
    device,
    user,
  }

  return { db, seed }
}
