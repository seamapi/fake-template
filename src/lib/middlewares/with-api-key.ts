import { Database } from "lib/db"
import { Middleware } from "nextlove"

export const withAPIKey: Middleware<
  {
    auth: { auth_mode: "api_key" }
  },
  {
    db: Database
  }
> = (next) => async (req, res) => {
  if (!req.db)
    return res.status(500).end("withAPIKey middleware requires withDb")

  const token = req.headers.authorization?.split("Bearer ")?.[1]
  if (!token) return res.status(401).end("missing authorization")

  // TODO validate authorization

  // Maybe add the user or the decoded jwt to the request via req.auth
  req.auth = { auth_mode: "api_key" }

  return next(req, res)
}

export default withAPIKey
