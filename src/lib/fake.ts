import {
  createDatabase,
  type Database,
  type DatabaseState,
  type ZustandDatabase,
} from "lib/database/index.ts"

import { createMakeRequest } from "./make-request.ts"

export const createFake = async (): Promise<Fake> => {
  const database = createDatabase()
  return new Fake(database)
}

export class Fake {
  public database: Omit<
    Database,
    "getState" | "setState" | "destroy" | "subscribe"
  >

  readonly #database: ZustandDatabase

  private readonly makeRequestWithDatabase: ReturnType<typeof createMakeRequest>

  constructor(database: ZustandDatabase) {
    this.#database = database
    this.database = database
    this.makeRequestWithDatabase = createMakeRequest(database)
  }

  async makeRequest(request: Request): Promise<Response> {
    return await (
      await this.makeRequestWithDatabase
    )(request)
  }

  async loadJSON(state: DatabaseState): Promise<void> {
    this.#database.setState(state)
  }

  async toJSON(): Promise<DatabaseState> {
    return this.#database.getState()
  }

  async update(): Promise<void> {
    this.#database.getState().update()
  }
}
