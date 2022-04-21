import wrappers from "nextjs-middleware-wrappers"
import { withDb, withAPIKey } from "lib/middlewares"

export default wrappers(withErrorHandling, withDb, withAPIKey, (req, res) => {
  res.status(200).json({ things: req.db.getState().things })
})
