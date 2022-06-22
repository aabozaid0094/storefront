import {Pool} from 'pg'
import config from '../config'

const database = (config.node_env === 'test') ? config.db_test : config.db;
const client = new Pool({
    host: config.db_host,
    database: database,
    user: config.db_user,
    password: config.db_password
})

export default client