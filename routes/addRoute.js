import { Router } from "express";
import { addRoutine } from "../controllers/homeControllers.js";

const addRoutes = Router();

addRoutes.route("/").post(addRoutine);

export default addRoutes;
