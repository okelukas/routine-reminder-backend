import { Router } from "express";
import {
  signUpUser,
  signInUser,
  getOneUser,
  getUsers,
} from "../controllers/userControllers.js";
import {
  checkUniqueUser,
  validateUserInput,
  checkEmptyLogin,
  checkEmptyUser,
  findOneUser,
} from "../middleware/validateUser.js";

import verifyToken from "../middleware/verificationUser.js";

const userRoute = Router();

userRoute.post(
  "/signup",
  checkEmptyUser,
  validateUserInput,
  checkUniqueUser,
  signUpUser
);
userRoute.post("/login", checkEmptyLogin, findOneUser, signInUser);


/* userRoute.get("/all", getUsers);
userRoute.get("/me", verifyToken, getOneUser); */

export default userRoute;
