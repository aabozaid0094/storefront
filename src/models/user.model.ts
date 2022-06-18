import config from "../config";
import client from "../database/index.db";
import { User } from "../types/user.type";
import bcrypt from "bcrypt";

const hashPassword = (password:string) => bcrypt.hashSync(`${password}${config.pepper}`, config.salt_rounds)

export default class UserStore{
    async index(): Promise<User[] | null>{
        try {
            const connection = await client.connect()
            const query = 'SELECT * FROM users'
            const result = await connection.query(query)
            connection.release()
            return result.rows
        } catch (error) {
            throw new Error(`Cannot get all users: ${error}`);
        }
    }

    async read(user_id: Number): Promise<User>{
        try {
            const connection = await client.connect()
            const query = 'SELECT * FROM users WHERE user_id = $1'
            const result = await connection.query(query, [user_id])
            connection.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Cannot create user: ${error}`);
        }
    }

    async create(user: User): Promise<User>{
        try {
            const connection = await client.connect()
            const query = 'INSERT INTO users (user_email, user_first_name, user_last_name, user_password_hash) VALUES ($1,$2,$3,$4) returning *'
            const result = await connection.query(query, [user.user_email, user.user_first_name, user.user_last_name, hashPassword(user.user_password)])
            connection.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Cannot create user: ${error}`);
        }
    }
}