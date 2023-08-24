import test from "ava"
import { seedDatabase } from "index.ts"

import { getTestServer } from "fixtures/get-test-server.ts"

test("seed database", async (t) => {
  const { db } = await getTestServer(t, { seed: false })
  t.notThrows(() => {
    seedDatabase(db)
  })
})
