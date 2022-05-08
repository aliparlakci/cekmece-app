import { DataSource } from "typeorm"
import dotenv from 'dotenv'
import path from "path"

dotenv.config()

const db = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "") || 3306,
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ["src/models/*.ts"],
    migrations: ["src/migrations/*.ts"],
    migrationsTableName: "migrations",
    logging: true,
    synchronize: false,
    // ssl: process.env.DB_SSL ? {
    //     ca: path.join(__dirname + process.env.DB_SSL)
    // } : undefined
})

export default db