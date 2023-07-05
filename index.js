import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { errorHandler } from "./middleware/errorHandler.js";

import homeRoutes from "./routes/homeRoute.js";
import addRoutes from "./routes/addRoute.js";
//import authRouter from "./routes/authRouter.js";
import JWTRouter from "./routes/JWTRoute.js";

import verifyJWTToken from "./middleware/verifyJWTToken.js";

const app = express();

const port = 3000;
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

/* app.use("/auth", authRouter); */
app.use("/jwt", JWTRouter);
app.use("/api/home", verifyJWTToken, homeRoutes);
app.use("/api/add", verifyJWTToken, addRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
