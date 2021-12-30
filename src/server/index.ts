import bodyParser from "body-parser";
import express from "express";

const PORT = 8080;
const app = express();

app.use(express.static("../public"), bodyParser.json());
app.listen(PORT, "localhost", () => console.info(`http://localhost:${PORT}`));

