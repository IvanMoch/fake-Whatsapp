import { createPool } from "mysql2/promise";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



dotenv.config({ path: path.join(__dirname, '.env') });

export const pool = createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectionLimit: 10
})

async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Connection was stablish successfully')
        connection.release();
    } catch (error) {
        console.error('Error connecting to the database: ', error)
    }
}

