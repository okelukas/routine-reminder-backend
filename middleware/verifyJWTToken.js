import jwt from "jsonwebtoken";
import pool from "../DB/client.js";

const verifyToken = async (req, res, next) => {
  try {
    const {
      headers: { authorization },
    } = req;

    if (!authorization) return next("please login");
    const token = authorization.split(" ")[1];
    const { user_id } = jwt.verify(token, process.env.JWT_SECRET);

    console.log(user_id);

    const myQuery = "SELECT * FROM users WHERE user_id = $1";
    const { rows: user } = await pool.query(myQuery, [user_id]);
    console.log("using DB call!--> verifyUser");
    console.log(user[0]);
    req.user = user[0];
    next();
  } catch (e) {
    return next(e.message);
  }
};

export default verifyToken;
