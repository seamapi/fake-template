import type { ExecutionContext } from "ava"
import type { Axios } from "axios"
import type { NextApiRequest } from "next"
import type { TypedAxios } from "typed-axios-instance"

import type { Database, Routes } from "@seamapi/fake-template"

import nsm from "nsm/get-server-fixture.ts"
import type { NextApiHandler, NextApiResponse } from "nsm/types/nextjs.ts"

import { type DatabaseFixture, getTestDatabase } from "./get-test-database.ts"

export type { SimpleAxiosError } from "nsm/get-server-fixture.ts"

const { default: getServerFixture } = nsm

type ServerFixture<TSeed = true> = DatabaseFixture<TSeed> &
  Omit<Awaited<ReturnType<typeof getServerFixture>>, "axios"> & {
    axios: TypedAxios<Routes>
    get: Axios["get"]
  }

interface ApiRequest extends NextApiRequest {
  db?: Database | undefined
}

export const getTestServer = async <TSeed extends boolean>(
  t: ExecutionContext,
  { seed: willSeed }: { seed?: TSeed } = {}
): Promise<ServerFixture<TSeed>> => {
  const { db, seed } = await getTestDatabase(t, {
    seed: willSeed ?? true,
  })

  const fixture = await getServerFixture(t, {
    middlewares: [
      (next: NextApiHandler) => (req: ApiRequest, res: NextApiResponse) => {
        req.db = db
        return next(req, res)
      },
    ],
  })

  fixture.axios.defaults.headers.common[
    "authorization"
  ] = `Bearer ${seed.api_key}`

  return {
    ...fixture,
    get: fixture.axios.get.bind(fixture.axios),
    db,
    seed: seed as any,
  }
}
