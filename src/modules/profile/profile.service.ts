import { pool } from "../../db";

const createProfileIntoDB = async (payload: any) => {
  // console.log(payload)

  const { user_id, bio, address, phone, gender } = payload;

  // First Check if the user with the given user_id exists in the users table
  const user = await pool.query("SELECT * FROM users WHERE id = $1", [user_id]);

  // console.log(user)

  if (user.rows.length === 0) {
    throw new Error("User with the given user_id does not exist.");
  }

  const result = await pool.query(
    `INSERT INTO profiles (user_id, bio, address, phone, gender) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [user_id, bio, address, phone, gender],
  );

  return result;
};

const getAllProfilesFromDB = async () => {
  const result = await pool.query("SELECT * FROM profiles");
  
  return result;
}

const getProfileByUserIdFromDB = async (id: string) => {
  const user_id = parseInt(id);
  const result = await pool.query("SELECT * FROM profiles WHERE user_id = $1", [user_id]);

  return result;
};

const deleteProfileByUserId = async (id: string) => {
  const user_id = parseInt(id);
  console.log(user_id)
  const result = await pool.query(`DELETE FROM profiles WHERE user_id = $1`, [user_id]);

  return result;
};

export const profileService = {
  createProfileIntoDB,
  getAllProfilesFromDB,
  getProfileByUserIdFromDB,
  deleteProfileByUserId,
};
