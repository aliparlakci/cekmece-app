import { DataSource } from "typeorm"

const db = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123123123",
    database: "cekmece",
    entities: ["src/models/*.ts"],
    migrations: ["src/migrations/*.ts"],
    migrationsTableName: "migrations",
    logging: true,
    synchronize: false,
})

export default db
