import { z } from "zod"

export const thing = z.object({
  thingId: z.string(),
  type: z.enum(["superthing", "lamething"]),
  status: z.enum(["online", "offline"]),
})
export const thingInitializer = thing.omit({ thingId: true })
export type Thing = z.infer<typeof thing>
export type ThingInitializer = z.input<typeof thingInitializer>
