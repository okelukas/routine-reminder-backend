import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import { errorHandler } from "./middleware/errorHandler.js";

import homeRoutes from "./routes/homeRoute.js";
import profileRoutes from "./routes/profileRoute.js";
import JWTRouter from "./routes/JWTRoute.js";

import verifyJWTToken from "./middleware/verifyJWTToken.js";

const app = express();

const port = 3000;
app.use(cors());
app.use(express.static("dist"))
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/jwt", JWTRouter);
app.use("/api/home", verifyJWTToken, homeRoutes);
app.use("/api/profile", verifyJWTToken, profileRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
