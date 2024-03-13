import type { Middleware } from "edgespec"

import type { Database } from "lib/database/index.ts"

export const withApiKey: Middleware<
  {
    db: Database
  },
  {
    auth: { auth_mode: "api_key" }
  }
> = async (req, ctx, next) => {
  if (ctx.db == null) {
    return new Response(
      "The withApiKey middleware requires req.db. Use it with the withDb middleware.",
      {
        status: 500,
      },
    )
  }

  const token = req.headers.get("authorization")?.split("Bearer ")?.[1]
  if (token == null) return new Response("Unauthorized", { status: 401 })

  // TODO: Validate authorization.
  // If relevant, add the user or the decoded JWT to the request on req.auth.
  ctx.auth = { auth_mode: "api_key" }

  return await next(req, ctx)
}
