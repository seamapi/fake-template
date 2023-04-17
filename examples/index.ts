#!/usr/bin/env tsx

import landlubber from 'landlubber'

import * as database from './database.ts'

const commands = [database]

await landlubber(commands).parse()
