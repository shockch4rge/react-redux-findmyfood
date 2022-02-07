import { UserData } from "./User";
import db from "../../db";
import { RowDataPacket } from "mysql2";
import bcrypt from "bcrypt";

export default class UserRepository {
    public static async update(id: string, user: UserData) {
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
            a.address = ?,
            a.telephone = ?
        WHERE u.id = ?    
        `;
        await db.query(query, [
            user.username,
            user.firstName,
            user.lastName,
            user.gender,
            user.email,
            user.address,
            user.telephone,
           id,
        ]);
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
            a.activated
        FROM user u
        JOIN account a
            ON a.user_id = u.id
        WHERE u.id = ?
        `;

        const results = await db.query(query, [id]);
        return (results[0] as RowDataPacket[])[0];
    }

    public static async login(email: string, password: string) {
        let query = `SELECT password FROM account WHERE email = ?`;
        // try to fetch the password
        const possiblePassword = (await db.query(query, [email]))[0] as RowDataPacket[];

        // if no password received, user entered the wrong email
        if (possiblePassword.length <= 0) {
            throw new Error("Could not find that email!");
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
            a.activated
        FROM user u
        JOIN account a
            ON a.user_id = u.id
        WHERE a.email = ? AND a.password = ?
        `;

        const results = await db.query(query, [email, _password]);
        return (results[0] as RowDataPacket[])[0];
    }

    public static async register(user: UserData) {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(user.password, salt);

        user.password = hash;
        user.activated = true;

        const isDuplicateEmail =
            ((await db.query(`SELECT * FROM account WHERE email = ?`, [user.email]))[0] as RowDataPacket[])
                .length >= 1;

        if (isDuplicateEmail) {
            throw new Error("Email already in use!");
        }

        try {
            await db.query(`START TRANSACTION`);
            await db.query(`INSERT INTO user VALUES (?, ?, ?, ?, ?, ?)`, [
                user.id,
                user.username,
                user.firstName,
                user.lastName,
                user.gender,
                user.avatarPath,
            ]);
            await db.query(`INSERT INTO account VALUES (?, ?, ?, ?, ?, ?)`, [
                user.id,
                user.email,
                user.password,
                user.address,
                user.telephone,
                user.activated,
            ]);
            await db.query(`COMMIT`);
        } catch (err) {
            console.error(err);
        }
    }

    public static async updatePassword(email: string, password: string) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const emailExists =
            ((await db.query(`SELECT * FROM account WHERE email = ?`, [email]))[0] as RowDataPacket[])
                .length >= 1;

        if (!emailExists) {
            throw new Error("Email does not exist!");
        }

        const query = `UPDATE account SET password = ? WHERE email = ?`;

        await db.query(query, [hashedPassword, email]);
    }

    public static async getAvatar(id: string) {
        const query = `
        SELECT avatar_path FROM user WHERE id = ?
        `;
        const results = await db.query(query, [id]);
        console.log(results[0]);
        return (results[0] as RowDataPacket[])[0].avatar_path;
    }
}
