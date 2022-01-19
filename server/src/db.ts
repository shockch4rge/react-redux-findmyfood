import mysql2 from "mysql2";
import config from "../config.json";

const db = mysql2.createConnection(config.sql).promise();
export default db;
