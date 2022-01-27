import { UserData } from "./User";
import db from "../../db";
import { RowDataPacket } from "mysql2";
import { uuid } from "../../utilities/uuid";
import bcrypt from "bcrypt";

export default class UserRepository {
    public static async update(id: string, data: Omit<UserData, "id">) {
        const values = Object.values(data);

        const query = `
        UPDATE user u
        JOIN account a
            ON a.user_id = u.id
        SET 
            u.username = ?,
            u.first_name = ?,
            u.last_name = ?,
            u.gender = ?,
            a.email = ?,
            a.password = ?,
            a.address = ?,
            a.telephone = ?,
            a.activated = ?
        WHERE u.id = ?    
        `;
        await db.query(query, [values, id]);
    }

    public static async delete(id: string) {
        const query = `DELETE FROM user WHERE id = ?`;
        await db.query(query, [id]);
    }

    public static async get(id: string) {
        const query = `
        SELECT 
            u.*,
            a.email,
            a.password,
            a.address,
            a.telephone,
            a.activated,
            ua.avatar_path
        FROM user u
        JOIN account a
            ON a.user_id = u.id
        JOIN user_avatar ua
            ON ua.user_id = u.id
        WHERE u.id = ?
        `;

        const results = await db.query(query, [id]);
        console.log(results[0]);
        
        return (results[0] as RowDataPacket[])[0];
    }

    public static async login(email: string, password: string) {
        let query = `SELECT password FROM account WHERE email = ?`;
        // try to fetch the password
        const possiblePassword = (await db.query(query, [email]))[0] as RowDataPacket[];

        // if no password received, user entered the wrong email
        if (possiblePassword.length <= 0) {
            throw new Error("Email was incorrect!");
        }

        const _password = possiblePassword[0]["password"];

        // compare the entered password and the actual one
        const verified = await bcrypt.compare(password, _password);

        if (!verified) {
            throw new Error("Password was incorrect!");
        }

        query = `
        SELECT 
            u.*,
            a.email,
            a.password,
            a.address,
            a.telephone,
            a.activated,
            ua.avatar_path
        FROM user u
        JOIN account a
            ON a.user_id = u.id
        JOIN user_avatar ua
            ON ua.user_id = u.id
        WHERE a.email = ? AND a.password = ?
        `;

        const results = await db.query(query, [email, _password]);
        console.log(results[0]);

        return (results[0] as RowDataPacket[])[0];
    }

    public static async register(user: UserData) {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;

        const userDetails = Object.values(user);

        console.log(userDetails);

        try {
            await db.query(`START TRANSACTION`);
            await db.query(`INSERT INTO user VALUES (?, ?, ?, ?, ?)`, [
                user.id,
                ...userDetails.slice(0, 4),
            ]);
            await db.query(`INSERT INTO account VALUES (?, ?, ?, ?, ?, ?)`, [
                user.id,
                ...userDetails.slice(4),
            ]);
            await db.query(`COMMIT`);
        } catch (err) {
            console.error(err);
        }
    }

    public static async updatePassword(id: string, password: string) {
        const query = `UPDATE user SET password = ? WHERE id = ?`;
        await db.query(query, [password, id]);
    }
}
