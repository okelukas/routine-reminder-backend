import { Router } from "express";
import { getRoutines } from "../controllers/homeControllers.js";
import { deactivateRoutine } from "../controllers/homeControllers.js";
import { completeRoutine } from "../controllers/homeControllers.js";

const homeRoutes = Router();

homeRoutes.route("/").get(getRoutines);
homeRoutes.route("/:id/deactivate").put(deactivateRoutine);
homeRoutes.route("/:id/complete").put(completeRoutine);

export default homeRoutes;
