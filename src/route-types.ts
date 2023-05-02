export type Routes = {
  "/health": {
    route: "/health"
    method: "GET"
    queryParams: {}
    jsonBody: {}
    commonParams: {}
    formData: {}
    jsonResponse: {
      note: string
      ok: boolean
    }
  }
  "/things": {
    route: "/things"
    method: "GET" | "POST"
    queryParams: {}
    jsonBody: {
      type: "superthing" | "lamething"
      status: "online" | "offline"
    }
    commonParams: {}
    formData: {}
    jsonResponse: {
      thing?:
        | {
            thingId: string
            type: "superthing" | "lamething"
            status: "online" | "offline"
          }
        | undefined
      things?:
        | {
            thingId: string
            type: "superthing" | "lamething"
            status: "online" | "offline"
          }[]
        | undefined
    }
  }
}

export type RouteResponse<Path extends keyof Routes> =
  Routes[Path]["jsonResponse"]

export type RouteRequestBody<Path extends keyof Routes> =
  Routes[Path]["jsonBody"] & Routes[Path]["commonParams"]

export type RouteRequestParams<Path extends keyof Routes> =
  Routes[Path]["queryParams"] & Routes[Path]["commonParams"]
