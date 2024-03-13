import type { ExecutionContext } from "ava"
import axios from "axios"
import type { Middleware } from "edgespec"
import { getTestServer as getTestEdgeSpecServer } from "edgespec/testing/ava"
import type { TypedAxios } from "typed-axios-instance"

import type { Database, Routes } from "@seamapi/fake-template"

import { getTestDatabase } from "./get-test-database.ts"

export const getTestServer = async <TSeed extends boolean>(
  t: ExecutionContext,
  { seed: willSeed }: { seed?: TSeed } = {},
) => {
  const { db, seed } = await getTestDatabase(t, {
    seed: willSeed ?? true,
  })

  const withDb: Middleware<unknown, { db: Database }> = async (
    req,
    ctx,
    next,
  ) => {
    ctx.db = db
    return await next(req, ctx)
  }

  const { port } = await getTestEdgeSpecServer(t, {
    middleware: [withDb],
  })

  const serverURL = `http://localhost:${port}`

  const client = axios.create({
    baseURL: serverURL,
  }) as TypedAxios<Routes>

  client.defaults.headers.common["authorization"] = `Bearer ${seed.api_key}`

  return {
    serverURL,
    client,
    db,
    seed,
  }
}
