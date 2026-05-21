import bcrypt from "bcrypt";
import { pool } from "../../db";
import type { IUser } from "./user.interface";

// Service function to create a new user in the database
const createUserIntoDB = async (payload: IUser) => {
  const { name, email, password, age, role } = payload;

  const hashPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `
     INSERT INTO users(name,email,password,age,role) VALUES($1,$2,$3,$4,COALESCE($5,'user')) RETURNING *
    `,
    [name, email, hashPassword, age, role],
  );

  delete result.rows[0].password;

  return result;
};

// Service function to get all users from the database
const getAllUsersFromDB = async () => {
  const result = await pool.query(`SELECT * FROM users `);

  result.rows.forEach((user) => {
    delete user.password;
  });

  return result;
};

// Service function to get a user by id from the database
const getUserByIdFromDB = async (id: string) => {
  const result = await pool.query(
    `
      SELECT * FROM users WHERE id=$1  
        `,
    [id],
  );

  delete result.rows[0].password;

  return result;
};

// Service function to update a user by id in the database\
const updateUserInDB = async (payload: IUser, id: string) => {
  const { name, password, age, is_active } = payload;

  const result = await pool.query(
    `
     UPDATE users SET name=$1, password=$2, age=$3, is_active=$4 WHERE id=$5 RETURNING *
    `,
    [name, password, age, is_active, id],
  );

  delete result.rows[0].password;

  return result;
};

// Service function to delete a user by id from the database
const deleteUserFromDB = async (id: string) => {
  const result = await pool.query(
    `
    DELETE FROM users WHERE id=$1  
      `,
    [id],
  );
  return result;
};

export const userService = {
  createUserIntoDB,
  getAllUsersFromDB,
  getUserByIdFromDB,
  updateUserInDB,
  deleteUserFromDB
};
