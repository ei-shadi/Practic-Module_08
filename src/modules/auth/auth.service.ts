import bcrypt from "bcrypt";
import { pool } from "../../db";
import jwt from "jsonwebtoken";
import config from "../../config";


const loginUserIntoDB = async (payload: {email : string, password : string}) => {
  const { email, password } = payload;
// Check if the user exists in the database
// If the user exists, compare the provided password 
// Generate a JWT token 

const userData = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);

if (userData.rows.length === 0) {
  throw new Error("Invalid Email");
}

const user = userData.rows[0];

const matchPassword = await bcrypt.compare(password, user.password);

if (!matchPassword) {
  throw new Error("Invalid Password");
  }

  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    is_active: user.is_active
  };

  const access_token = jwt.sign(jwtPayload, config.secret, {
    expiresIn: "1h",
  });

  return {
    access_token,
    user: jwtPayload,
  }
}

export const authService = {
  loginUserIntoDB,
};