import { Router } from "express";
import { getProfile } from "../controller/profileControllers.js";
import { editProfile } from "../controller/profileControllers.js";
import { changePassword } from "../controller/JWTController.js";
import {
  validateEmailAndUsername,
  checkUniqueUser,
} from "../middleware/validateUser.js";

const profileRoutes = Router();

profileRoutes.route("/").get(getProfile);
profileRoutes
  .route("/")
  .put(validateEmailAndUsername, editProfile);
profileRoutes.route("/password/").put(changePassword);

export default profileRoutes;
