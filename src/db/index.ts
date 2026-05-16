import { Pool } from "pg";
import config from "../config";


export const pool = new Pool({
  connectionString: config.connection_string,
});

export const initDB = async () => {
  try {

    // Create users table 
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(20),
        email VARCHAR(20) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        is_active BOOLEAN DEFAULT true,
        age INT,

        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )`);
        
      // User Profiles table
      await pool.query(`
        CREATE TABLE IF NOT EXISTS profiles(
          id SERIAL PRIMARY KEY,
          user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,

          bio TEXT,
          address VARCHAR(255),
          phone VARCHAR(20),
          gender VARCHAR(10),
          
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        )`);
    console.log("Database connected successfully!");
  } catch (error) {
    console.log(error);
  }
};