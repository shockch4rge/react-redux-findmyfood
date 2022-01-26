import { RowDataPacket } from "mysql2";
import db from "../../db";

export default class ImageRepository {
    public static async get(userId: string) {
        const query = `SELECT avatar_path FROM user_avatar WHERE user_id = ?`;
        const results = await db.query(query, [userId]);
        return (results[0] as RowDataPacket[])[0];
    }

    public static async upload(userId: string, fileName: string) {
        const query = `INSERT INTO user_avatar VALUES (?, ?)`;
        await db.query(query, [userId, fileName]);
    }

    public static async delete(userId: string) {
        const query = `DELETE FROM user_avatar WHERE user_id = ?`;
        await db.query(query, [userId]);
    }
}
