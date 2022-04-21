export const withAPIKey = (next) => async (req, res) => {
  if (!req.db)
    return res.status(500).end("withAPIKey middleware requires withDb")

  const token = req.headers.authorization?.split("Bearer ")?.[1]
  if (!token) return res.status(401).end("missing authorization")

  // TODO validate authorization

  return next(req, res)
}

export default withAPIKey
