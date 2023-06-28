import { Router } from "express";
import { getRoutines } from "../controllers/homeControllers.js";
import { deactivateRoutine } from "../controllers/homeControllers.js";
import { completeRoutine } from "../controllers/homeControllers.js";
import { editRoutine } from "../controllers/homeControllers.js";
import { editRequest } from "../controllers/homeControllers.js";

const homeRoutes = Router();

homeRoutes.route("/").get(getRoutines);
homeRoutes.route("/:id/deactivate").put(deactivateRoutine);
homeRoutes.route("/:id/complete").put(completeRoutine);
homeRoutes.route("/:id/edit").put(editRoutine);
homeRoutes.route("/:id/editrequest").put(editRequest);

export default homeRoutes;
