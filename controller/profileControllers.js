import pool from "../DB/client.js";
import jwt from "jsonwebtoken";

export const getUserID = (req) => {
  try {
    const {
      headers: { authorization },
    } = req;

    if (!authorization) {
      throw new Error("Please login");
    }
    const token = authorization.split(" ")[1];

    const { user_id } = jwt.verify(token, process.env.JWT_SECRET);
    console.log(user_id);
    return user_id;
  } catch (e) {
    next(e.message);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const user_id = getUserID(req);
    const queryProfile = `SELECT user_id, username, email
      FROM users
      WHERE user_id = ${user_id}`;
    const { rows: profileData } = await pool.query(queryProfile);
    // console.log("line 18: " + routinesData);
    return res.json(profileData);
  } catch (e) {
    next(e.message);
  }
};

export const editProfile = async (req, res, next) => {
  try {
    const user_id = getUserID(req);
    const { email, username } = req.body;
    console.log("Hello from editProfile");
    const queryEditProfile = `UPDATE users SET email = $1, username = $2 WHERE user_id = ${user_id}`;
    await pool.query(queryEditProfile, [email, username]);
    return res.status(200).send("Profile edited successfully.");
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Error editing profile.");
  }
};
