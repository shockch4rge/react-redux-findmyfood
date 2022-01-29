import { RowDataPacket } from "mysql2";
import { ReviewData } from "./Review";
import db from "../../db"
import { uuid } from "../../utilities/uuid";

export default class ReviewRepository {

    public static async get(id: string) {
        const query = `SELECT * FROM review WHERE id = ?`;
        const results = await db.query(query, [id]);
        return (results[0] as RowDataPacket[])[0];
    }

    public static async getByUserAndRestaurantId(userId: string, restaurantId: string) {
        const query = `SELECT * FROM review WHERE user_id = ? AND restaurant_id = ?`;
        const reviews = await db.query(query, [userId, restaurantId]);
        return (reviews[0] as RowDataPacket[])[0];
    }

    public static async delete(id: string) {
        const query = `DELETE FROM review WHERE id = ?`;
        await db.query(query, [id]);
    }

    public static async add(review: Omit<ReviewData, "id" | "isEdited">) {
        const values = Object.values(review);
        const id = uuid();
        const query = `INSERT INTO review VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
        await db.query(query, [id, ...values, false])
    }

    public static async update(id: string, review: Pick<ReviewData, "title" | "content" | "rating" | "timestamp"  | "isEdited">) {
        const values = Object.values(review);
        const query = `UPDATE review SET title = ?, content = ?, rating = ?, timestamp = ?, is_edited = ? WHERE id = ?`
        await db.query(query, [...values, id]);
    }

    public static async getRestaurantReviews(restaurantId: string) {
        const query = `SELECT * FROM review WHERE restaurant_id = ?`;
        const reviews = await db.query(query, [restaurantId]);
        return reviews[0];
    }
}
