import test, { type ExecutionContext } from "ava"

import {
  getTestServer,
  type SimpleAxiosError,
} from "fixtures/get-test-server.ts"

test("GET /things", async (t: ExecutionContext) => {
  const { axios, seed } = await getTestServer(t)
  const { status, data } = await axios.get("/things")
  t.is(status, 200)
  t.is(data?.things?.length, 1)
  t.is(data?.things?.[0]?.thingId, seed.thing.thingId)
})

test("GET /things (401)", async (t: ExecutionContext) => {
  const { axios } = await getTestServer(t)
  const error = await t.throwsAsync<SimpleAxiosError>(async () =>
    axios.get("/things", { headers: { authorization: null } })
  )
  t.is(error?.status, 401)
})

test("POST /things", async (t: ExecutionContext) => {
  const { axios, seed } = await getTestServer(t)
  const { status, data } = await axios.post("/things", {
    type: "superthing",
    status: "online",
  })
  t.is(status, 201)
  t.not(data?.thing?.thingId, seed.thing.thingId)
})
