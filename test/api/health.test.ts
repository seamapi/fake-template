import test, { type ExecutionContext } from 'ava'

import {
  getTestServer,
  type SimpleAxiosError,
} from 'fixtures/get-test-server.ts'

test('GET /health', async (t: ExecutionContext) => {
  const { axios } = await getTestServer(t)
  const res = await axios.get('/health')
  t.true(res.data.ok)
  t.truthy(res.data.note)
})

// Example of testing API error.
test('GET /', async (t: ExecutionContext) => {
  const { axios } = await getTestServer(t)
  const err = await t.throwsAsync<SimpleAxiosError>(
    async () => await axios.get('/')
  )
  t.is(err?.status, 404)
})
