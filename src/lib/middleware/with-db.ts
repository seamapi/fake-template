import type { Middleware } from "nextlove"

import { type Database, getSingletonDatabase } from "lib/database/index.ts"

export const withDb: Middleware<{
  db: Database
}> = (next) => (request, res) => {
  if (process.env.NODE_ENV === "test" && request.db == null) {
    throw new Error(
      `In the test environment, req.db must be set by server middleware.`
    )
  }

  request.db ??= getSingletonDatabase()
  return next(request, res)
}

export default withDb
