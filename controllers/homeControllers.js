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

export const deactivateRoutine = async (req, res, next) => {
  try {
    const { id } = req.params;
    const queryDeactivateRoutine =
      "UPDATE routines SET active = false WHERE id = $1";
    await pool.query(queryDeactivateRoutine, [id]);
    return res.status(200).send("Routine deactivated successfully.");
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Error deactivating routine.");
  }
};
export const completeRoutine = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Step 1: Get current value of the "complete" column

    const queryGetCurrentValue = "SELECT complete FROM routines WHERE id = $1";
    const currentValueResult = await pool.query(queryGetCurrentValue, [id]);
    const currentValue = currentValueResult.rows[0].complete;

    // Step 2: Toggle the value

    const newValue = !currentValue;

    //Step 3: update the column

    const queryToggleComplete =
      "UPDATE routines SET complete = $1 WHERE id = $2";
    await pool.query(queryToggleComplete, [newValue, id]);

    return res
      .status(200)
      .send("Routine completion status updated successfully.");
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Error updating routine completion status.");
  }
};
