import { z } from "zod"

import { withRouteSpec } from "lib/middleware/index.ts"
import * as m from "lib/models.ts"

const jsonBody = m.thingInitializer

const jsonResponse = z.object({
  thing: m.thing.optional(),
  things: z.array(m.thing).optional(),
})

export default withRouteSpec({
  auth: "api_key",
  methods: ["GET", "POST"],
  jsonBody: jsonBody.optional(),
  jsonResponse,
})(async (req, ctx) => {
  if (req.method === "GET") {
    return ctx.json({ things: ctx.db.things })
  }

  if (req.method === "POST") {
    // todo: enable method discrimination upstream (https://github.com/seamapi/edgespec/issues/136)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const thing = ctx.db.addThing(req.jsonBody!)
    return ctx.json({ thing }).status(201)
  }

  return ctx.json({}).status(405)
})
