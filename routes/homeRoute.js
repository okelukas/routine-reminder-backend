import { Router } from "express";
import { getRoutines } from "../controllers/homeControllers.js";
import { deactivateRoutine } from "../controllers/homeControllers.js";

const homeRoutes = Router();

homeRoutes.route("/").get(getRoutines);
homeRoutes.route("/:id").put(deactivateRoutine);

export default homeRoutes;
