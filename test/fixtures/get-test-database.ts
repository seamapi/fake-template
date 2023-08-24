import type { ExecutionContext } from "ava"

import { createDatabase, type Database,  type Seed, seedDatabase  } from "index.ts"

export interface DatabaseFixture<TSeed = true> {
  db: Database
  seed: TSeed extends true ? Seed : never
}

export const getTestDatabase = async (
  _t: ExecutionContext,
  { seed = true }: { seed?: boolean } = {}
): Promise<DatabaseFixture> => {
  const db = createDatabase()
  if (seed) {
    return { db, seed: seedDatabase(db) }
  }
  return { db, seed: {} as any }
}
