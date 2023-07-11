import bcrypt from "bcrypt";
import pool from "../DB/client.js";
import jwt from "jsonwebtoken";

const saltRounds = Number(process.env?.SALT_ROUNDS) || 10;

export const signInUser = async (req, res, next) => {
  try {
    // Get credentials from JSON body
    const { email, password } = req.body;

    // Check if the user exists
    const myQuery = "SELECT * FROM users WHERE email = $1";
    const { rows: user } = await pool.query(myQuery, [email]);

    if (user.length === 0) {
      return next({ message: "User not registered" });
    }

    // Compare the hashed password
    const match = await bcrypt.compare(password, user[0].password);
    if (!match) {
      return next({ message: "Wrong password" });
    }

    // Sign a token with the user's ID
    const token = jwt.sign(
      { user_id: user[0].user_id },
      process.env.JWT_SECRET
    );
    //console.log(user[0].user_id);

    return res.status(201).json(token);
  } catch (e) {
    next(e.message);
  }
};

export const signUpUser = async (req, res, next) => {
  try {
    //Get JSON body
    const { username, email, password, timezone } = req.body;

    //hash password
    const hash = await bcrypt.hash(password, saltRounds);

    //create new user on DB
    const myQuery =
      "INSERT INTO users (username, email, password, timezone) VALUES ($1, $2, $3, $4)";
    const { rows: newUser } = await pool.query(myQuery, [
      username,
      email,
      hash,
      timezone,
    ]);

    const myNewQuery = "SELECT * FROM users WHERE email = $1";
    const response = await pool.query(myNewQuery, [email]);
    const {
      rows: [{ user_id }],
    } = response;

    //sign a token with user Id
    const token = jwt.sign({ user_id: user_id }, process.env.JWT_SECRET);

    //return token
    return res.status(201).json(token);
  } catch (e) {
    next(e.message);
  }
};
