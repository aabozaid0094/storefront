import {Pool} from 'pg'
import config from '../config'

const client = new Pool({
    host: config.db_host,
    database: config.db,
    user: config.db_user,
    password: config.db_password
})

export default client