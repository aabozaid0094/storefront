import dotenv from 'dotenv'

dotenv.config()

const{
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

console.log(NODE_ENV)

export default {
    node_env: NODE_ENV,
    port: parseInt(PORT as unknown as string),
    db_host: POSTGRES_HOST,
    db_port: parseInt(POSTGRES_PORT as unknown as string),
    db: POSTGRES_DB,
    db_test: POSTGRES_DBTest,
    db_user: POSTGRES_USER,
    db_password: POSTGRES_PASSWORD,
    salt_rounds: parseInt(SALT_ROUNDS as unknown as string),
    pepper: PEPPER,
    token: TOKEN,
}