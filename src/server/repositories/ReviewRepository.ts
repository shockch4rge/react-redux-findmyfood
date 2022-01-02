import { RowDataPacket } from "mysql2";
import { ReviewData } from "../../client/models/Review";
import db from "../db"

export default class ReviewRepository {

    public async get(id: string) {
        const query = `SELECT * FROM review WHERE id = ?`;
        const results = await db.query(query, [id]);
        return (results[0] as RowDataPacket)[0];
    }

    public delete(id: string) {
        const query = `DELETE FROM review WHERE id = ?`;
        return db.query(query, [id]);
    }

    public add(review: ReviewData) {
        const values = Object.values(review);
        const query = `INSERT INTO review VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
        return db.query(query, [...values])
    }

    public update(id: string, review: Pick<ReviewData, "title" | "content" | "rating" | "timestamp"  | "isEdited">) {
        const values = Object.values(review);
        const query = `UPDATE review SET title = ?, content = ?, rating = ?, timestamp = ?, is_edited = ? WHERE id = ?`
        return db.query(query, [...values, id]);
    }

    public async getRestaurantReviews(restaurantId: string) {
        const query = `SELECT * FROM review WHERE restaurant_id = ?`;
        const reviews = await db.query(query, [restaurantId]);
        return reviews;
    }
}
