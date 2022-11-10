import { NextApiRequest } from "next"
import { DatabaseState } from "lib/db"
import { z } from "zod"
import { Simplify } from "type-fest"

export interface RequestWithDb extends NextApiRequest {
  db: DatabaseState
}

export const thingZod = z.object({
  thing_id: z.string(),
  type: z.enum(["superthing", "lamething"]),
  status: z.enum(["online", "offline"]),
})
export type Thing = Simplify<z.infer<typeof thingZod>>
export type ThingInitializer = Partial<Thing> & Pick<Thing, "type">
