import { RowDataPacket } from "mysql2";
import { ReplyData } from "./Reply";
import db from "../../db";
import { uuid } from "../../utilities/uuid";

export default class ReplyRepository {
    public static async getReviewReplies(reviewId: string) {
        const query = `SELECT * FROM reply WHERE review_id = ?`;
        const results = await db.query(query, [reviewId]);
        return results[0] as RowDataPacket[];
    }

    public static async update(
        id: string,
        data: Pick<ReplyData, "content" | "timestamp" | "isEdited">
    ) {
        const values = Object.values(data);
        const query = `UPDATE reply SET content = ?, timestamp = ?, is_edited = ? WHERE id = ?`;
        await db.query(query, [...values, id]);
    }

    public static async add(reply: Omit<ReplyData, "id" | "isEdited">) {
        const values = Object.values(reply);
        const id = uuid();
        const query = `INSERT INTO reply VALUES (?, ?, ?, ?, ?, ?)`;
        await db.query(query, [id, ...values, false]);
    }

    public static async get(id: string) {
        const query = `SELECT * FROM reply WHERE id = ?`;
        const results = await db.query(query, [id]);
        return (results[0] as RowDataPacket[])[0];
    }

    public static async delete(id: string) {
        const query = `DELETE FROM reply WHERE id = ?`;
        await db.query(query, [id]);
    }
}
