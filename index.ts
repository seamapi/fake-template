import { createDb } from "lib/db"
import { startServer } from "./server"
export * from "./types"

export const create = async () => {
  let database = await createDb()
  return {
    database,
    async startServer() {
      this.server = await startServer({ db: database })
      return this.server
    },
    async stopServer() {
      return this.server.close()
    },
    loadJSON: (newState) => {
      database.state = newState
    },
    toJSON: () => database.state,
    update: () => database.update(),
  }
}

export default create
