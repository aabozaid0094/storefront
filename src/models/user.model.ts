import config from '../config'
import client from '../database/index.db'
import { User } from '../types/user.type'
import bcrypt from 'bcrypt'

const hashPassword = (password: string) =>
    bcrypt.hashSync(`${password}${config.pepper}`, config.salt_rounds)

export default class UserStore {
    async index(): Promise<User[]> {
        try {
            const connection = await client.connect()
            const query = 'SELECT * FROM users'
            const result = await connection.query(query)
            connection.release()
            return result.rows
        } catch (error) {
            throw new Error(`Cannot get all users: ${error}`)
        }
    }

    async create(user: User): Promise<User> {
        try {
            const connection = await client.connect()
            const query =
                'INSERT INTO users (user_email, user_first_name, user_last_name, user_password) VALUES ($1,$2,$3,$4) returning *'
            const result = await connection.query(query, [
                user.user_email,
                user.user_first_name,
                user.user_last_name,
                hashPassword(user.user_password),
            ])
            connection.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Cannot create user: ${error}`)
        }
    }

    async show(user_id: number): Promise<User> {
        try {
            const connection = await client.connect()
            const query = 'SELECT * FROM users WHERE user_id=($1)'
            const result = await connection.query(query, [user_id])
            connection.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Cannot find user ${user_id}: ${error}`)
        }
    }

    async login(user_email: string, user_password: string): Promise<User|null> {
        try {
            const connection = await client.connect()
            const query = 'SELECT user_password FROM users WHERE user_email=($1)'
            const result = await connection.query(query, [user_email])
            if (result.rows.length) {
                const valid_user_password_hash = result.rows[0]
                const passwordIsValid = bcrypt.compareSync(`${user_password}${config.pepper}`, valid_user_password_hash)
                if (passwordIsValid) {
                    const userQuery = 'SELECT user_email, user_first_name, user_last_name FROM users WHERE user_email=($1)'
                    const userResult = await connection.query(userQuery, [user_email])
                    console.log(userResult)
                    return userResult.rows[0]
                }
            }
            connection.release()
            return null
        } catch (error) {
            throw new Error(`Cannot login user ${user_email}: ${error}`)
        }
    }

    async edit(user_id: number, modified_user: User): Promise<User> {
        try {
            const connection = await client.connect()
            const query =
                'UPDATE users SET user_email = $2, user_first_name = $3, user_last_name = $4, user_password = $5 WHERE user_id = $1 returning *'
            const result = await connection.query(query, [
                user_id,
                modified_user.user_email,
                modified_user.user_first_name,
                modified_user.user_last_name,
                hashPassword(modified_user.user_password),
            ])
            connection.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Cannot edit user ${user_id}: ${error}`)
        }
    }

    async delete(user_id: number): Promise<User> {
        try {
            const connection = await client.connect()
            const query = 'DELETE FROM users WHERE user_id = $1 returning *'
            const result = await connection.query(query, [user_id])
            connection.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Cannot delete user ${user_id}: ${error}`)
        }
    }
}
