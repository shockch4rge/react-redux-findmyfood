import { RowDataPacket } from "mysql2";
import db from "../../db";
import { uuid } from "../../utilities/uuid";
import { RestaurantData } from "./Restaurant";

export default class RestaurantRepository {
    public static async get(id: String) {
        const query = `
        SELECT 
            r.*, 
            a_t.days,
            a_t.opening_hours,
            a_t.closing_hours 
        FROM restaurant r
        JOIN available_times a_t
            ON a_t.restaurant_id = r.id
        WHERE r.id = ?
        `;

        const results = await db.query(query, [id]);
        return (results[0] as RowDataPacket[])[0];
    }

    public static async getAll() {
        const query = `
        SELECT 
            r.*, 
            a_t.days,
            a_t.opening_hours,
            a_t.closing_hours 
        FROM restaurant r
        JOIN available_times a_t
            ON a_t.restaurant_id = r.id
        `;
        const results = await db.query(query);

        return results[0] as RowDataPacket[];
    }

    public static async add(restaurant: Omit<RestaurantData, "id">) {
        const id = uuid();

        await db.query(`START TRANSACTION`);
        await db.query(`INSERT INTO restaurant VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [
            id,
            restaurant.name,
            restaurant.description,
            restaurant.address,
            restaurant.telephone,
            restaurant.averageRating,
            restaurant.cuisines.join(", "),
            restaurant.imageUrl,
        ]);
        await db.query(`INSERT INTO available_times VALUES (?, ?, ?, ?)`, [
            id,
            restaurant.availableTimes.days.join(", "),
            restaurant.availableTimes.openingHours,
            restaurant.availableTimes.closingHours,
        ]);
        await db.query(`COMMIT`);
    }
}
