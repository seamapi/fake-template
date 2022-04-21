import test from "ava"
import getTestServer from "tests/fixtures/get-test-server"

test("GET /things/list", async (t) => {
  const { axios, seed, db } = await getTestServer(t)

  const res = await axios.get("/things/list", {
    // You might want to add authorization headers in getTestServer
    // automatically
    headers: {
      Authorization: `Bearer ${seed.apiKey}`,
    },
  })

  t.deepEqual(res.data.things, [
    {
      thing_id: "thing_1",
      type: "superthing",
      status: "online",
    },
  ])
})

test("GET /things/list after power failure", async (t) => {
  const { axios, seed, db } = await getTestServer(t)

  db.getState().simulatePowerFailure(db.getState().things[0].thing_id)

  const resAfterFailure = await axios.get("/things/list", {
    headers: {
      Authorization: `Bearer ${seed.apiKey}`,
    },
  })

  t.deepEqual(resAfterFailure.data.things, [
    {
      thing_id: "thing_1",
      type: "superthing",
      status: "offline",
    },
  ])
})
