import test from "ava"

import { getTestServer } from "fixtures/get-test-server.ts"

test("GET /health", async (t) => {
  const { axios } = await getTestServer(t)
  const { data } = await axios.get("/health")
  t.true(data.ok)
  t.truthy(data.note)
})
