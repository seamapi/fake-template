import test from "ava"
import type { AxiosError } from "axios"

import { getTestServer } from "fixtures/get-test-server.ts"

test("GET /things", async (t) => {
  const { axios, seed } = await getTestServer(t)
  const { status, data } = await axios.get("/things")
  t.is(status, 200)
  t.is(data?.things?.length, 1)
  t.is(data?.things?.[0]?.thingId, seed.thing_1)
})

test("GET /things (401)", async (t) => {
  const { axios } = await getTestServer(t)
  const err = await t.throwsAsync<AxiosError>(
    async () =>
      await axios.get("/things", { headers: { authorization: null } }),
  )
  t.is(err?.response?.status, 401)
})

test("POST /things", async (t) => {
  const { axios, seed } = await getTestServer(t)
  const { status, data } = await axios.post("/things", {
    type: "superthing",
    status: "online",
  })
  t.is(status, 201)
  t.not(data?.thing?.thingId, seed.thing_1)
})
