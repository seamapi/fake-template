import { z } from "zod"

export const thing = z.object({
  thing_id: z.string(),
  type: z.enum(["superthing", "lamething"]),
  status: z.enum(["online", "offline"]),
})
export const thingInitializer = thing.omit({ thing_id: true })
export type Thing = z.infer<typeof thing>
export type ThingInitializer = z.infer<typeof thingInitializer>
