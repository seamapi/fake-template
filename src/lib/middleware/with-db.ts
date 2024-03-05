import type { Middleware } from "edgespec"

import { type Database, getSingletonDatabase } from "lib/database/index.ts"

export const withDb: Middleware<
  {},
  {
    db: Database
  }
> = async (req, ctx, next) => {
  if (process.env["NODE_ENV"] === "test" && ctx.db == null) {
    throw new Error(
      `In the test environment, req.db must be set by server middleware.`,
    )
  }

  ctx.db ??= getSingletonDatabase()
  return await next(req, ctx)
}
