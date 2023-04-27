import test, { type ExecutionContext } from "ava"

import {
  getTestServer,
  type SimpleAxiosError,
} from "fixtures/get-test-server.ts"

test("GET /health", async (t: ExecutionContext) => {
  const { axios } = await getTestServer(t)
  const { data } = await axios.get("/health")
  t.true(data.ok)
  t.truthy(data.note)
})

// Example of testing API error.
test("GET /", async (t: ExecutionContext) => {
  const { axios } = await getTestServer(t)
  const error = await t.throwsAsync<SimpleAxiosError>(
    // @ts-expect-error Testing a 404 so the route does not exist in route-types.
    async () => axios.get("/")
  )
  t.is(error?.status, 404)
})
