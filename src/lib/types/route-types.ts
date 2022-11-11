export interface Routes {
  "/api/health": {
    route: "/api/health"
    method: "GET"
    queryParams: {}
    jsonBody: {}
    commonParams: {}
    jsonResponse: {
      note: string
      ok: boolean
    }
  }
  "/api/things/list": {
    route: "/api/things/list"
    method: "GET" | "POST"
    queryParams: {}
    jsonBody: {}
    commonParams: {}
    jsonResponse: {
      things: {
        thing_id: string
        type: "superthing" | "lamething"
        status: "online" | "offline"
      }[]
      ok: boolean
    }
  }
}

export type RouteResponse<Path extends keyof Routes> =
  Routes[Path]["jsonResponse"]

export type RouteRequestBody<Path extends keyof Routes> =
  Routes[Path]["jsonBody"] & Routes[Path]["commonParams"]

export type RouteRequestParams<Path extends keyof Routes> =
  Routes[Path]["queryParams"] & Routes[Path]["commonParams"]
