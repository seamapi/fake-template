import { createDb } from "lib/db"

async function main() {
  const db = await createDb()

  await db.getState().addThing({
    type: "superthing",
  })

  console.log(JSON.stringify(db.getState(), null, "  "))
}

if (!module.parent) {
  main()
}
