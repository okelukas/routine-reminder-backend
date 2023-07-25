import { Router } from "express";
import { getRoutines } from "../controller/homeControllers.js";
import { deactivateRoutine } from "../controller/homeControllers.js";
import { completeRoutine } from "../controller/homeControllers.js";
import { editRoutine } from "../controller/homeControllers.js";
import { addRoutine } from "../controller/homeControllers.js";
import { setCookie } from "../controller/homeControllers.js";
import { reset } from "../controller/homeControllers.js";
import { editEntireRoutine } from "../controller/homeControllers.js";

const homeRoutes = Router();

homeRoutes.route("/").get(getRoutines);
homeRoutes.route("/").post(addRoutine);
homeRoutes.route("/:id/deactivate").put(deactivateRoutine);
homeRoutes.route("/:id/complete").put(completeRoutine);
homeRoutes.route("/:id/edit").put(editRoutine);
homeRoutes.route("/:id/editentire").put(editEntireRoutine);
homeRoutes.route("/reset").put(reset);
homeRoutes.route("/setCookie").put(setCookie);

export default homeRoutes;
