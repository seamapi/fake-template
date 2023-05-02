import type { Middleware } from "nextlove"

import type { Database } from "lib/database/index.ts"

export const withApiKey: Middleware<
  {
    auth: { auth_mode: "api_key" }
  },
  {
    db: Database
  }
> = (next) => async (request, res) => {
  if (request.db == null) {
    return res
      .status(500)
      .end(
        "The withApiKey middleware requires req.db. Use it with the withDb middleware."
      )
  }

  const token = request.headers.authorization?.split("Bearer ")?.[1]
  if (token == null) return res.status(401).end("Unauthorized")

  // TODO: Validate authorization.
  // If relevant, add the user or the decoded JWT to the request on req.auth.
  request.auth = { auth_mode: "api_key" }

  return next(request, res)
}

withApiKey.securitySchema = {
  type: "apiKey",
}

export default withApiKey
