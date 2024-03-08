import { z } from "zod"

import { withRouteSpec } from "lib/middleware/index.ts"

const jsonResponse = z.object({
  note: z.string(),
  ok: z.boolean(),
})

export default withRouteSpec({
  auth: "none",
  methods: ["GET"],
  middlewares: [],
  jsonResponse,
})(async (_req, ctx) => {
  return ctx.json({
    note: "This is not part of the real API.",
    ok: true,
  })
})
