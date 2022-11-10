import { createWithRouteSpec, MiddlewareChainOutput } from "nextlove"
import withAPIKey from "./with-api-key"
import withDb from "./with-db"

export const withRouteSpec = createWithRouteSpec({
  apiName: "Fake Template (replace me)",
  productionServerUrl: "http://example.com",
  globalMiddlewares: [withDb],
  authMiddlewareMap: {
    api_key: withAPIKey,
  },
  // TODO
  // addOkStatus: false
} as const)

export default withRouteSpec
