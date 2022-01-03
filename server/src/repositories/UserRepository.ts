import User, { UserData } from "../../client/models/User";
import db from "../db";
import { AccountData } from "../../client/models/Account";
import { RowDataPacket } from "mysql2";

export default class UserRepository {
    public async create(user: User) {}

    public async update(id: string, user: User) {}

    public async delete(id: string) {
        const query = `DELETE FROM user WHERE id = ?`;
        return db.query(query, [id]);
    }

    public async get(id: string) {
        const query = "SELECT * FROM user WHERE id = ?";

        return db.query(query, [id]);
    }

    public async login(email: string, password: string) {
        const query = `SELECT u.* FROM user u, account a WHERE a.email = ? AND a.password = ? AND u.id = a.user_id`;
        const results = await db.query(query, [email, password]);
        return (results[0] as RowDataPacket[])[0];
    }

    public async register(user: UserData, account: AccountData) {
        const userDetails = Object.values(user);
        const accountDetails = Object.values(account);

        try {
            await db.query(`START TRANSACTION`);
            await db.query(`INSERT INTO user VALUES (?, ?, ?, ?, ?, ?)`, [...userDetails]);
            await db.query(`INSERT INTO account VALUES (?, ?, ?, ?, ?, ?)`, [...accountDetails]);
            await db.query(`COMMIT`);
        }
        catch (err) {
            console.error(err);
        }
    }   
}
