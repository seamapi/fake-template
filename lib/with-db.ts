import { getGlobalDb } from "./db"
export const withDb = (next) => async (req, res) => {
  if (!req.db) {
    req.db = await getGlobalDb()
  }
  return next(req, res)
}

export default withDb
