import { RowDataPacket } from "mysql2";
import db from "../../db";

export default class RestaurantRepository {
    public static async get(id: String) {
        const query = `SELECT * FROM restaurant WHERE id = ?`;
        const results = await db.query(query, [id]);
        return (results[0] as RowDataPacket[])[0];
    }

    
}