import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config(); // Load .env variables

const pool = mysql.createPool({
  host: process.env.DB_HOST!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASS!,
  database: process.env.DB_NAME!,
  connectionLimit: 10,
});

export default pool;
