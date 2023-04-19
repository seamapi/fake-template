import test, { type ExecutionContext } from 'ava'

import { type Routes } from 'index.ts'

import {
  getTestServer,
  type SimpleAxiosError,
} from 'fixtures/get-test-server.ts'

type Route = Routes['/health']

test('GET /health', async (t: ExecutionContext) => {
  const { axios } = await getTestServer(t)
  const { data } = await axios.get<Route['jsonResponse']>('/health')
  t.true(data.ok)
  t.truthy(data.note)
})

// Example of testing API error.
test('GET /', async (t: ExecutionContext) => {
  const { axios } = await getTestServer(t)
  const err = await t.throwsAsync<SimpleAxiosError>(
    async () => await axios.get('/')
  )
  t.is(err?.status, 404)
})
