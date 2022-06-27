import dotenv from 'dotenv'

dotenv.config()

const {
    NODE_ENV,
    PORT,
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_DB,
    POSTGRES_DBTest,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    SALT_ROUNDS,
    PEPPER,
    TOKEN,
} = process.env

export default {
    node_env: NODE_ENV as unknown as string,
    port: parseInt(PORT as unknown as string),
    db_host: POSTGRES_HOST as unknown as string,
    db_port: parseInt(POSTGRES_PORT as unknown as string),
    db: POSTGRES_DB as unknown as string,
    db_test: POSTGRES_DBTest as unknown as string,
    db_user: POSTGRES_USER as unknown as string,
    db_password: POSTGRES_PASSWORD as unknown as string,
    salt_rounds: parseInt(SALT_ROUNDS as unknown as string),
    pepper: PEPPER as unknown as string,
    token: TOKEN as unknown as string,
}
