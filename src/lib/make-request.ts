import type { Middleware } from "edgespec/middleware"

// @ts-expect-error
import bundle from "../../bundled-routes.js"
import { createDatabase, type Database } from "./database/index.js"

export const createMakeRequest = (database?: Database) => {
  const databaseInjectionMiddleware: Middleware<
    {},
    {
      db: Database
    }
  > = async (request, ctx, next) => {
    ctx.db = database ?? createDatabase()
    return await next(request, ctx)
  }

  return async (request: Request) =>
    bundle.makeRequest(request, {
      middleware: [databaseInjectionMiddleware],
    })
}
