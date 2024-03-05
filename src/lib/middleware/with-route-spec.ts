import { createWithEdgeSpec } from "edgespec"

import { withApiKey } from "./with-api-key.ts"
import { withDb } from "./with-db.ts"

export const withRouteSpec = createWithEdgeSpec({
  openapi: {
    apiName: "Fake Template",
    productionServerUrl: "https://example.com",
  },
  shouldValidateGetRequestBody: false,
  beforeAuthMiddleware: [withDb],
  authMiddleware: {
    api_key: withApiKey,
  },
})

export default withRouteSpec
