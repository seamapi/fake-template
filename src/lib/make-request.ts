import { loadBundle } from "edgespec"
import type { Middleware } from "edgespec/middleware"

import { createDatabase, type Database } from "./database/index.js"

export const createMakeRequest = async (database?: Database) => {
  const bundle = await loadBundle("../../bundled-routes.js")

  const databaseInjectionMiddleware: Middleware<
    unknown,
    {
      db: Database
    }
  > = async (request, ctx, next) => {
    ctx.db = database ?? createDatabase()
    return await next(request, ctx)
  }

  return async (request: Request) =>
    await bundle.makeRequest(request, {
      middleware: [databaseInjectionMiddleware],
    })
}
