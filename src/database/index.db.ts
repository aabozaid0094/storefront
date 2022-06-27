import { Pool, types } from 'pg'
import config from '../config'

types.setTypeParser(1700, (val) => parseFloat(val))

const database = ("test" === config.node_env) ? config.db_test : config.db

const client = new Pool({
    host: config.db_host,
    database: database,
    user: config.db_user,
    password: config.db_password,
})

export default client
