import { createDb } from "lib/db"
import { startServer } from "./server"
export * from "./src/lib/types"

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
      database.setState(newState)
    },
    toJSON: () => database.getState(),
    update: () => database.getState().update(),
  }
}

export default create
