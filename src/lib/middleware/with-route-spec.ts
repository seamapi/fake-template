import { createWithRouteSpec } from "nextlove"

import withApiKey from "./with-api-key"
import withDb from "./with-db"

export const withRouteSpec = createWithRouteSpec({
  apiName: "Fake Template",
  productionServerUrl: "https://example.com",
  shouldValidateGetRequestBody: false,
  globalMiddlewares: [withDb],
  authMiddlewareMap: {
    api_key: withApiKey,
  },
} as const)

export default withRouteSpec
