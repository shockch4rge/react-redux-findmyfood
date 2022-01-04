import e, { Request, Response } from "express";
import PromiseRouter from "express-promise-router";
import fs from "fs";
import path from "path";

// Controllers

// // Front-end testing
// router.get("/api/test", async (req, res) => res.json({ message: "nice" }));

// // User and Account
// router.get("/user/login", async (req, res) => await users.loginUser(req, res));
// router.post("/user/register", async (req, res) => await users.registerUser(req, res));
// router.put("/user/:userId", async (req, res) => await users.updateUser(req, res));
// router.get(
//     "/user/:userId/bookmarks",
//     async (req, res) => await users.getAllUserBookmarks(req, res)
// );
// router.post("/user/:userId/bookmarks", async (req, res) => await users.addBookmark(req, res));
// router.get(
//     "/user/:userId/bookmarks/:bookmarkId",
//     async (req, res) => await users.getUserBookmark(req, res)
// );
// router.delete(
//     "/user/:userId/bookmarks/:bookmarkId",
//     async (req, res) => await users.deleteBookmark(req, res)
// );

// // Review and Reply
// router.post("/review", async (req, res) => await reviews.add(req, res));
// router.get("/review/:id", async (req, res) => reviews.get(req, res));
// router.put("/review/:id", async (req, res) => await reviews.update(req, res));
// router.get(
//     "/review/:reviewId/replies",
//     async (req, res) => await replies.getReviewReplies(req, res)
// );
// router.post("/review/:reviewId/replies", async (req, res) => await replies.add(req, res));
// router.get("/review/:reviewId/replies/:replyId", async (req, res) => await replies.get(req, res));
// router.put(
//     "/review/:reviewId/replies/:replyId",
//     async (req, res) => await replies.update(req, res)
// );

// // Restaurants
// router.get("/restaurant", async (req, res) => await restaurants.get(req, res));

// router.post("/image", async (req, res) => await images.upload(req, res))

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

    public setup() {
        const schemas: RouteSchema[][] = [];
        const routeDir = path.join(__dirname, "./routes");

        for (const routeFile of fs.readdirSync(routeDir)) {
            const schema = require(`${routeDir}/${routeFile}`) as RouteSchema[];
            schemas.push(schema);
        }

        for (const schema of schemas) {
            schema.forEach(map => {
                switch (map.method) {
                    case "get":
                        this.router.get(map.uri, async (req, res) => await map.proc(req, res));
                        break;
                    case "post":
                        this.router.post(map.uri, async (req, res) => await map.proc(req, res));
                        break;
                    case "put":
                        this.router.put(map.uri, async (req, res) => await map.proc(req, res));
                        break;
                    case "delete":
                        this.router.delete(map.uri, async (req, res) => await map.proc(req, res));
                        break;
                }
            });
        }
    }
}
