import { createWithEdgeSpec } from "edgespec"
import { createWithDefaultExceptionHandling } from "edgespec/middleware"

import { withApiKey } from "./with-api-key.ts"
import { withDb } from "./with-db.ts"

export const withRouteSpec = createWithEdgeSpec({
  openapi: {
    apiName: "Fake Template",
    productionServerUrl: "https://example.com",
  },
  beforeAuthMiddleware: [createWithDefaultExceptionHandling(), withDb],
  authMiddleware: {
    api_key: withApiKey,
  },
})
