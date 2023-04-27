import type { Server as HttpServer } from "node:http"

import getPort from "get-port"
import type { NextApiRequest } from "next"

import { createDatabase, type Database } from "lib/database/index.ts"
import * as nsm from "nsm/index.ts"

import logger from "lib/logger.ts"

const { runServer } = nsm

type ServerOptions = {
  port: number
  server: HttpServer
}

type ApiRequest = {
  db?: Database | undefined
} & NextApiRequest

export async function startServer(
  options: { port?: number; database?: Database } = {}
): Promise<Server> {
  const database = options.database ?? createDatabase()
  const port = options.port ?? (await getPort())

  logger.debug(`Starting fake on http://localhost:${port}`)

  const server = await runServer({
    port,
    middlewares: [
      (next) => (request: ApiRequest, res) => {
        request.db = database
        return next(request, res)
      },
    ],
  })

  return new Server({ server, port })
}

export class Server {
  public port: number
  public server: HttpServer

  constructor({ port, server }: ServerOptions) {
    this.port = port
    this.server = server
  }

  get serverUrl(): string {
    return `http://localhost:${this.port}`
  }

  close(): void {
    this.server.close()
  }
}

export default startServer
