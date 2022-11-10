import { Database, getGlobalDb } from "lib/db"
import { Middleware } from "nextlove"

export const withDb: Middleware<{
  db: Database
}> = (next) => (req, res) => {
  if (!req.db) {
    if (process.env.NODE_ENV === "test")
      throw new Error(`In tests, the req.db should be set by server middleware`)
    req.db = getGlobalDb()
  }
  return next(req, res)
}

export default withDb
