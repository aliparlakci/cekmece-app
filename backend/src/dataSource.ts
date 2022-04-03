import { DataSource } from "typeorm"

const db = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "45404540",
    database: "cekmece",
    entities: ["src/models/*.ts"],
    migrations: ["src/migrations/*.ts"],
    migrationsTableName: "migrations",
    logging: true,
    synchronize: true,
})

export default db