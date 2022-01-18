import express from "express";
import cors from "cors";
import RouterManager from "./classes/RouteManager";
import fileUpload from "express-fileupload";

const PORT = 8080;
const app = express();
const routes = new RouterManager();

const router = routes.getConfiguredRouter();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(fileUpload());
app.use("/uploads", express.static("uploads"));
app.use("/api", router);

app.listen(PORT, "localhost", () => console.info(`Listening on http://localhost:${PORT}`));
