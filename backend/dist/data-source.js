import { DataSource } from "typeorm";
import { Company } from "./entities/Company.js";
import { Driver } from "./entities/Driver.js";
import { Vehicle } from "./entities/Vehicle.js";
import { Order } from "./entities/Order.js";
import { User } from "./entities/User.js";
export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "logistics_db",
    synchronize: true,
    logging: false,
    entities: [User, Company, Driver, Vehicle, Order],
});
