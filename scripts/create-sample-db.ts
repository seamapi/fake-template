import { createDb } from "lib/db"

async function main() {
  const db = await createDb()

  const u1 = await db.addUser({
    email: "jane@example.com",
    password: "1234",
  })

  const u2 = await db.addUser({
    email: "john@example.com",
    password: "1234",
  })

  const l1 = await db.addDevice(u1, {
    name: "FRONT DOOR",
  })

  const l2 = await db.addDevice(u1, {
    name: "BACK DOOR",
  })

  const l3 = await db.addDevice(u1, {
    name: "GARAGE",
  })

  console.log(JSON.stringify(db.state, null, "  "))
}

if (!module.parent) {
  main()
}
