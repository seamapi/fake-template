import withRouteSpec from "lib/middlewares/with-route-spec"
import { z } from "zod"
import { thingZod } from "lib/types"

export default withRouteSpec({
  auth: "none",
  methods: ["GET", "POST"],
  jsonResponse: z.object({
    things: z.array(thingZod),
  }),
} as const)(async (req, res) => {
  res.status(200).json({ things: req.db.getState().things })
})
