import pool from "../DB/client.js";

export const getRoutines = async (req, res, next) => {
  try {
    const queryRoutines = "SELECT * FROM routines ORDER BY time";
    const { rows: routinesData } = await pool.query(queryRoutines);
    console.log(routinesData);
    return res.json(routinesData);
  } catch (e) {
    next(e.message);
  }
};

export const addRoutine = async (req, res, next) => {
  try {
    const { routine, time } = req.body;

    if ((!routine, !time)) {
      return res.status(400).send("data missing");
    }

    const queryAddRoutine =
      "INSERT INTO routines (routine, time, active) VALUES ($1, $2, true) RETURNING *";

    const data = await pool.query(queryAddRoutine, [routine, time]);
    return res.status(201).json(data.rows);
  } catch (error) {
    console.log(error.message);
    return next("DESTINATION_INVALID_ENTRIES");
  }
};
