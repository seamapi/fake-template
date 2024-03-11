import type { Middleware } from "edgespec/middleware"

// @ts-expect-error (otherwise this will throw during `edgespec codegen`)
import bundle from "../../dist/bundled-routes.js"
import { createDatabase, type Database } from "./database/index.js"

export const createMakeRequest = async (database?: Database) => {
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
