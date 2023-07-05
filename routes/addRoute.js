import { Router } from "express";
import { addRoutine } from "../controller/homeControllers.js";

const addRoutes = Router();

addRoutes.route("/").post(addRoutine);

export default addRoutes;
