import e, { Request, Response } from "express";
import PromiseRouter from "express-promise-router";
import fs from "fs";
import path from "path";

export interface RouteSchema {
    uri: string;
    method: "get" | "post" | "put" | "delete";
    proc: (req: Request, res: Response) => Promise<void>;
}

export default class RouterManager {
    public readonly router: e.Router;

    public constructor() {
        this.router = PromiseRouter({ strict: true });
    }

    /**
     * Configures the router with routes in the folder
     * @returns The configured router.
     */
    public getConfiguredRouter() {
        const schemas: RouteSchema[][] = [];
        const routeDir = path.join(__dirname, "../routes");

        for (const routeFile of fs.readdirSync(routeDir)) {
            const schema = require(`${routeDir}/${routeFile}`) as RouteSchema[];
            schemas.push(schema);
        }

        for (const schema of schemas) {
            schema.forEach(route =>
                this.router[route.method](route.uri, async (req, res) => await route.proc(req, res))
            );
        }

        return this.router;
    }
}
