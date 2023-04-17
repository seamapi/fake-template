import test, { type ExecutionContext } from 'ava'

import { getTestServer } from 'fixtures/get-test-server.ts'

test('GET /health', async (t: ExecutionContext) => {
  const { axios } = await getTestServer(t)
  const res = await axios.get('/health')
  t.true(res.data.ok)
  t.truthy(res.data.note)
})
