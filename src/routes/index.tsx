import { withRouteSpec } from "lib/middleware/index.ts"
import { renderJsxToResponse } from "lib/render-jsx-to-response.ts"

export default withRouteSpec({
  auth: "none",
  methods: ["GET"],
  middlewares: [],
})(async (_req, _ctx) => {
  return await renderJsxToResponse(<h1>Hello world!</h1>)
})
