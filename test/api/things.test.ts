import test, { type ExecutionContext } from "ava"

import { getTestServer } from "fixtures/get-test-server.ts"

test("GET /things", async (t: ExecutionContext) => {
  const { axios, seed } = await getTestServer(t)
  const { status, data } = await axios.get("/things")
  t.is(status, 200)
  t.is(data?.things?.length, 1)
  t.is(data?.things?.[0]?.thing_id, seed.thing.thing_id)
})

test("POST /things", async (t: ExecutionContext) => {
  const { axios, seed } = await getTestServer(t)
  const { status, data } = await axios.post("/things", {
    type: "superthing",
    status: "online",
  })
  t.is(status, 201)
  t.not(data?.thing?.thing_id, seed.thing.thing_id)
})
