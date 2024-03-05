export type Routes = {
    "/health": {
        route: "/health";
        method: "GET";
        jsonResponse: {
            note: string;
            ok: boolean;
        };
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
