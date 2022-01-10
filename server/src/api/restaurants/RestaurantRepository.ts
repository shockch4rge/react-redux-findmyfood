import { RowDataPacket } from "mysql2";
import db from "../../db";

export default class RestaurantRepository {
    public static async get(id: String) {
        const query = `
        SELECT 
            r.*, 
            a_t.days,
            a_t.opening_hours,
            a_t.closing_hours, 
            ri.image_url
        FROM restaurant r
        JOIN available_times a_t
            ON a_t.restaurant_id = r.id
        JOIN restaurant_image ri
            ON ri.restaurant_id = r.id
        WHERE r.id = ?
        `;

        const results = await db.query(query, [id]);
        return (results[0] as RowDataPacket[])[0];
    }

    public static async getAll() {
        const query = `SELECT * FROM restaurant`;
        const results = await db.query(query);

        return (results[0] as RowDataPacket[])
    }
}
