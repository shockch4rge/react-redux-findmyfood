import { UserData } from "./User";
import db from "../../db";
import { AccountData } from "./Account";
import { RowDataPacket } from "mysql2";
import { BookmarkData } from "../bookmarks/Bookmark";
import { uuid } from "../../utilities/uuid";

export default class UserRepository {
    public static async update(id: string, data: UserData) {
        const query = `UPDATE user SET first_name = ?, last_name, `
    }

    public static async delete(id: string) {
        const query = `DELETE FROM user WHERE id = ?`;
        await db.query(query, [id]);
    }

    public static async get(id: string) {        
        const query = "SELECT * FROM user WHERE id = ?";

        const results = await db.query(query, [id]);
        return (results[0] as RowDataPacket[])[0];
    }

    public static async login(email: string, password: string) {
        const query = `SELECT u.* FROM user u, account a WHERE a.email = ? AND a.password = ? AND u.id = a.user_id`;
        const results = await db.query(query, [email, password]);
        return (results[0] as RowDataPacket[])[0];
    }

    public static async register(user: Omit<UserData, "id">, account: Omit<AccountData, "userId">) {
        const userDetails = Object.values(user);
        const accountDetails = Object.values(account);
        const id = uuid();

        try {
            await db.query(`START TRANSACTION`);
            await db.query(`INSERT INTO user VALUES (?, ?, ?, ?, ?, ?)`, [id, ...userDetails]);
            await db.query(`INSERT INTO account VALUES (?, ?, ?, ?, ?, ?)`, [id, ...accountDetails]);
            await db.query(`COMMIT`);
        }
        catch (err) {
            console.error(err);
        }
    }

    public static async getAllUserBookmarks(userId: string) {
        const query = `SELECT * FROM bookmark WHERE user_id = ?`;
        const results = await db.query(query, [userId]);
        return (results[0] as RowDataPacket[]);
    }

    public static async getUserBookmark(userId: string, bookmarkId: string) {
        const query = `SELECT * FROM bookmark WHERE user_id = ? AND id = ?`;
        const results = await db.query(query, [userId, bookmarkId]);
        return (results[0] as RowDataPacket[])[0];
    }

    public static async addBookmark(data: BookmarkData) {
        const values = Object.values(data);
        const query = `INSERT INTO bookmark VALUES (?, ?, ?)`;
        await db.query(query, [...values])
    }

    public static async deleteBookmark(id: string) {
        const query = `DELETE FROM bookmark WHERE id = ?`;
        await db.query(query, [id]);
    }
}
