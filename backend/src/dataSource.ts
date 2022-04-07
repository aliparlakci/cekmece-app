import { DataSource } from "typeorm"
import dotenv from 'dotenv'

dotenv.config()

const db = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ["src/models/*.ts"],
    migrations: ["src/migrations/*.ts"],
    migrationsTableName: "migrations",
    logging: true,
    synchronize: false,
})

export default db