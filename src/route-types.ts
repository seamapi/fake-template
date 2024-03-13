export type Routes = {
    "/health": {
        route: "/health";
        method: "GET";
        jsonResponse: {
            note: string;
            ok: boolean;
        };
    };
    "": {
        route: "";
        method: "GET";
    };
    "/things": {
        route: "/things";
        method: "GET" | "POST";
        jsonResponse: {
            thing?: {
                thingId: string;
                type: "superthing" | "lamething";
                status: "online" | "offline";
            } | undefined;
            things?: {
                thingId: string;
                type: "superthing" | "lamething";
                status: "online" | "offline";
            }[] | undefined;
        };
        jsonBody: {
            type: "superthing" | "lamething";
            status: "online" | "offline";
        } | undefined;
    };
};
type ExtractOrUnknown<T, Key extends string> = Key extends keyof T ? T[Key] : unknown;
export type RouteResponse<Path extends keyof Routes> = ExtractOrUnknown<Routes[Path], "jsonResponse">;
export type RouteRequestBody<Path extends keyof Routes> = ExtractOrUnknown<Routes[Path], "jsonBody"> & ExtractOrUnknown<Routes[Path], "commonParams">;
export type RouteRequestParams<Path extends keyof Routes> = ExtractOrUnknown<Routes[Path], "queryParams"> & ExtractOrUnknown<Routes[Path], "commonParams">;
export {};
