import mysql2 from "mysql2";
import config from "../config.json";

const sql = mysql2.createConnection(config.sql);

sql.connect(err => {
    if (err) throw err;

    console.log("Connected to MySQL");
});

export default sql;
