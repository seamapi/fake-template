import test from "ava"

import { getTestServer } from "fixtures/get-test-server.ts"

test("GET /health", async (t) => {
  const { client } = await getTestServer(t)
  const { data } = await client.get("/health")
  t.true(data.ok)
  t.truthy(data.note)
})
