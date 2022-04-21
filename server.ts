import getPort from "get-port"
import logger from "lib/logger"
import { createDb, Database } from "lib/db"

interface Params {
  port?: number
  db?: Database
}

export async function startServer({ port, db }: Params = {}) {
  const startNSM = require("./.nsm").default
  db ??= await createDb()
  port ||= await getPort()
  logger.debug(`starting fake-august on 0.0.0.0:${port}`)
  const server = await startNSM({
    port,
    middlewares: [
      (next) => (req, res) => {
        req.db = db
        return next(req, res)
      },
    ],
  })
  return {
    port,
    database: db,
    serverUrl: `http://localhost:${port}`,
    close: async () => {
      server.close()
    },
  }
}

export default startServer
