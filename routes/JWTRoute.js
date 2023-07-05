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
  getUser,
  signUpUser,
} from "../controller/JWTController.js";
import verifyJWTToken from "../middleware/verifyJWTToken.js";

const JWTRoutes = Router();

JWTRoutes.post(
  "/signup",
  checkEmptyUser,
  validateUserInput,
  checkUniqueUser,
  signUpUser
);
JWTRoutes.post("/signin", signInUser);
JWTRoutes.get("/me", verifyJWTToken, getUser);

export default JWTRoutes;
