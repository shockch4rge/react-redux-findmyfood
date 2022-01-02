import express from "express";
import router from "./routes";
import cors from "cors";

const PORT = 8080;
const app = express();

app.use(express.static("../public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(router);

app.listen(PORT, "localhost", () => console.info(`Listening on http://localhost:${PORT}`));
