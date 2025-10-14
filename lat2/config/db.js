import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config();

const pool = postgres({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 10,
});

// Test the connection
const testConnection = async () => {
  try {
    const result = await pool`SELECT 1`;
    console.log('PostgreSQL Connected');
  } catch (err) {
    console.error('PostgreSQL Connection Error:', err);
  }
};

testConnection();

export default pool;
