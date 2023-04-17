import type { Builder, Command, Describe, Handler } from 'landlubber'

import { createDatabase, type Thing } from 'index.ts'

interface Options {
  type: Thing['type']
}

export const command: Command = 'thing add [type]'

export const describe: Describe = 'Create sample database.'

export const builder: Builder = {
  type: {
    type: 'string',
    default: 'superthing',
    describe: 'Thing type',
  },
}

export const handler: Handler<Options> = async ({ type, logger }) => {
  const db = createDatabase()
  db.getState().addThing({ type })
  logger.info(db.getState())
}
