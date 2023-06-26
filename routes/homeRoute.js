import { Router } from "express";
import { getRoutines } from "../controllers/homeControllers.js";

const homeRoutes = Router();

homeRoutes.route("/").get(getRoutines);

export default homeRoutes;
