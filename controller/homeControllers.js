import pool from "../DB/client.js";
import jwt from "jsonwebtoken";

const getUserID = (req) => {
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

export const getRoutines = async (req, res, next) => {
  try {
    const user_id = getUserID(req);
    const queryRoutines = `SELECT *
    FROM routines
    INNER JOIN user_routines ON routines.routine_id = user_routines.routine_id
    WHERE user_routines.user_id = ${user_id} AND routines.active = true
    ORDER BY routines.time`;

    const { rows: routinesData } = await pool.query(queryRoutines);
    // console.log("line 18: " + routinesData);
    return res.json(routinesData);
  } catch (e) {
    next(e.message);
  }
};

export const addRoutine = async (req, res, next) => {
  try {
    const { routine, time } = req.body;

    if (!routine || !time) {
      return res.status(400).send("data missing");
    }

    const user_id = getUserID(req);

    console.log(user_id + " line 57");

    const queryAddRoutine =
      "INSERT INTO routines (name, time, complete) VALUES ($1, $2, false) RETURNING routine_id";

    const { rows } = await pool.query(queryAddRoutine, [routine, time]);
    const routine_id = rows[0].routine_id;

    // Link the routine to the user using the user_id and routine_id
    const queryLinkRoutine =
      "INSERT INTO user_routines (user_id, routine_id) VALUES ($1, $2)";
    await pool.query(queryLinkRoutine, [user_id, routine_id]);

    return res.status(201).json(rows);
  } catch (error) {
    console.log(error.message);
    return next("DESTINATION_INVALID_ENTRIES");
  }
};

export const deactivateRoutine = async (req, res, next) => {
  try {
    const { id } = req.params;
    const queryDeactivateRoutine =
      "UPDATE routines SET active = false WHERE routine_id = $1";

    await pool.query(queryDeactivateRoutine, [id]);
    return res.status(200).send("Routine deactivated successfully.");
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Error deactivating routine.");
  }
};
export const reset = async (req, res, next) => {
  try {
    const user_id = getUserID(req);
    const queryResetRoutines = `UPDATE routines SET complete = false WHERE routine_id IN (SELECT routine_id FROM user_routines WHERE user_id = ${user_id}`;
    await pool.query(queryResetRoutines);
    console.log("All routines reset to complete = false");
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Error deactivating routine.");
  }
};

export const completeRoutine = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);

    // Step 1: Get current value of the "complete" column

    const queryGetCurrentValue =
      "SELECT complete FROM routines WHERE routine_id = $1";
    const currentValueResult = await pool.query(queryGetCurrentValue, [id]);
    const currentValue = currentValueResult.rows[0].complete;

    // Step 2: Toggle the value

    const newValue = !currentValue;

    //Step 3: update the column

    const queryToggleComplete =
      "UPDATE routines SET complete = $1 WHERE routine_id = $2";
    await pool.query(queryToggleComplete, [newValue, id]);

    return res
      .status(200)
      .send("Routine completion status updated successfully.");
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Error updating routine completion status.");
  }
};

export const editRoutine = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { time, routine } = req.body;
    console.log("Hello");
    //const parsedId = parseInt(id, 10); // Convert id to integer
    const queryEditRoutine =
      "UPDATE routines SET time = $1, name = $2 WHERE routine_id = $3";
    await pool.query(queryEditRoutine, [time, routine, id]);
    return res.status(200).send("Routine edited successfully.");
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Error editing routine.");
  }
};

export const editRequest = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Step 1: Get current value of the "edit" column

    const queryGetCurrentValue =
      "SELECT edit FROM routines WHERE routine_id = $1";
    const currentValueResult = await pool.query(queryGetCurrentValue, [id]);
    const currentValue = currentValueResult.rows[0].edit;

    // Step 2: Toggle the value

    const newValue = !currentValue;

    //Step 3: update the column

    const queryToggleEdit =
      "UPDATE routines SET edit = $1 WHERE routine_id = $2";
    await pool.query(queryToggleEdit, [newValue, id]);

    return res.status(200).send("Edit request status updated successfully.");
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Error updating edit request status.");
  }
};
