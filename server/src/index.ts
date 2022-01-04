import express from "express";
import cors from "cors";
import RouterManager from "./RouteManager";
import fileUpload from "express-fileupload";

const PORT = 8080;
const app = express();
const routes = new RouterManager();

routes.setup();

app.use("/static", express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(fileUpload())
app.use(routes.router);

app.listen(PORT, "localhost", () => console.info(`Listening on http://localhost:${PORT}`));
