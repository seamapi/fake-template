import { getGlobalDb } from "lib/db"

export const withDb = (next) => (req, res) => {
  if (!req.db) {
    if (process.env.NODE_ENV === "test")
      throw new Error(`In tests, the req.db should be set by server middleware`)
    req.db = getGlobalDb()
  }
  return next(req, res)
}

export default withDb
