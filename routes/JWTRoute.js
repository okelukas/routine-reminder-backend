import { Router } from "express";

import {
  checkUniqueUser,
  validateUserInput,
  checkEmptyLogin,
  checkEmptyUser,
  findOneUser,
} from "../middleware/validateUser.js";

import {
  signInUser,
  signUpUser,
} from "../controller/JWTController.js";

const JWTRoutes = Router();

JWTRoutes.post(
  "/signup",
  checkEmptyUser,
  validateUserInput,
  checkUniqueUser,
  signUpUser
);
JWTRoutes.post("/login", signInUser);

export default JWTRoutes;
