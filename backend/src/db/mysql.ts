import { createPool } from 'mysql2/promise'

const mysqlConnection = createPool({
  host: process.env.DB_HOST,
  user:  process.env.DB_USER,
  database: process.env.DB_NAME
})

export default mysqlConnection