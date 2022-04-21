import { NextApiRequest } from "next"
import { DatabaseState } from "lib/db"

export interface RequestWithDb extends NextApiRequest {
  db: DatabaseState
}

export interface Thing {
  thing_id: string
  type: "superthing" | "lamething"
  status: "online" | "offline"
}

export type ThingInitializer = Partial<Thing> & Pick<Thing, "type">
