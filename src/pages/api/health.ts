import { withRouteSpec } from "lib/middlewares"
import { z } from "zod"

export default withRouteSpec({
  auth: "none",
  methods: ["GET"],
  middlewares: [],
  jsonResponse: z.object({ note: z.string(), ok: z.boolean() }),
} as const)(async (req, res) => {
  res.status(200).json({
    ok: true,
    note: "this is not part of the [insert manufacturer name] api",
  })
})
