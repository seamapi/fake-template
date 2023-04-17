import { type ExecutionContext } from 'ava'
import { type NextApiRequest } from 'next'

import { type Database } from 'lib/database/types.ts'
import nsm from 'nsm/get-server-fixture.ts'
import { type NextApiHandler, type NextApiResponse } from 'nsm/types/nextjs.ts'

import { type DatabaseFixture, getTestDatabase } from './get-test-database.ts'

const { default: getServerFixture } = nsm

type ServerFixture = DatabaseFixture &
  Awaited<ReturnType<typeof getServerFixture>>

interface ApiRequest extends NextApiRequest {
  db?: Database | undefined
}

export const getTestServer = async (
  t: ExecutionContext
): Promise<ServerFixture> => {
  const { db, seed } = await getTestDatabase(t)

  const fixture = await getServerFixture(t, {
    middlewares: [
      (next: NextApiHandler) => (req: ApiRequest, res: NextApiResponse) => {
        req.db = db
        return next(req, res)
      },
    ],
  })

  // Here's how you might put an authorization header on every request
  // fixture.axios.defaults.headers.common.Authorization = `Bearer ${seed.apiKey}

  return {
    ...fixture,
    db,
    seed,
  }
}
