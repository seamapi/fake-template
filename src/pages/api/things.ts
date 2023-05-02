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
  jsonBody,
  jsonResponse,
} as const)(async ({ method, body, db }, res) => {
  if (method === "GET") {
    res.status(200).json({ things: db.things })
  }

  if (method === "POST") {
    const thing = db.addThing(body)
    res.status(201).json({ thing })
  }
})
