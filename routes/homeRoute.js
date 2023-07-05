import { Router } from "express";
import { getRoutines } from "../controller/homeControllers.js";
import { deactivateRoutine } from "../controller/homeControllers.js";
import { completeRoutine } from "../controller/homeControllers.js";
import { editRoutine } from "../controller/homeControllers.js";
import { editRequest } from "../controller/homeControllers.js";

const homeRoutes = Router();

homeRoutes.route("/").get(getRoutines);
homeRoutes.route("/:id/deactivate").put(deactivateRoutine);
homeRoutes.route("/:id/complete").put(completeRoutine);
homeRoutes.route("/:id/edit").put(editRoutine);
homeRoutes.route("/:id/editrequest").put(editRequest);

export default homeRoutes;
