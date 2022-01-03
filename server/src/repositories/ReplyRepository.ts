import { RowDataPacket } from "mysql2";
import { ReplyData } from "../../client/models/Reply";
import db from "../db";

export default class ReplyRepository {
    public async getReviewReplies(reviewId: string) {
        const query = `SELECT * FROM reply WHERE review_id = ?`;
        const results = await db.query(query, [reviewId]);
        return results;
    }

    public async update(id: string, data: Pick<ReplyData, "content" | "timestamp" | "isEdited">) {
        const values = Object.values(data);
        const query = `UPDATE reply SET content = ?, timestamp = ?, is_edited = ? WHERE id = ?`;
        const results = await db.query(query, [...values, id]);
        return (results[0] as RowDataPacket[])[0];
    }

    public async add(reply: ReplyData) {
        const values = Object.values(reply);
        const query = `INSERT INTO reply VALUES (?, ?, ?, ?, ?, ?)`;
        await db.query(query, [...values]);
    }

    public async get(id: string) {
        const query = `SELECT * FROM reply WHERE id = ?`;
        const results = await db.query(query, [id]);
        return (results[0] as RowDataPacket[])[0];
    }
}
