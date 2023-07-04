import pool from "../DB/client.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";

const saltRounds = Number(process.env?.SALT_ROUNDS) || 12;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: 900 });
};

const signUpUser = async (req, res, next) => {
  try {
    const { username, email, password, timezone } = req.body;

    const hash = await bcrypt.hash(password, saltRounds);
    const myQuery =
      "INSERT INTO users (username, email, password, timezone) VALUES ($1, $2, $3, $4)";
    const { rows: newUser } = await pool.query(myQuery, [
      username,
      email,
      hash,
      timezone,
    ]);
    const myNewQuery = "SELECT * FROM Users WHERE email = $1";
    const { rows: user } = await pool.query(myNewQuery, [email]);
    const token = createToken(user.user_id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: 900 });
    res.status(201).json({ user: user.username });
  } catch (e) {
    next(e.message);
  }
};

const signInUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const myQuery = "SELECT * FROM users WHERE email = $1";
    const { rows: user } = await pool.query(myQuery, [email]);
    const match = await bcrypt.compare(password, user[0].password);
    if (!match) return next({ message: "Wrong password" });
    const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET);
    console.log(user[0]);
    return res.status(201).send({ token: token, user: user[0] });
  } catch (e) {
    next(e.message);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const myQuery = "SELECT * FROM Users";
    const { rows: users } = await pool.query(myQuery);
    res.json(users);
  } catch (e) {
    next(e.message);
  }
};

const getOneUser = (req, res) => {
  res.json(req.user);
};

export { signUpUser, signInUser, getUsers, getOneUser };
