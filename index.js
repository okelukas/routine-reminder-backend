import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import homeRoutes from "./routes/homeRoute.js";
import addRoutes from "./routes/addRoute.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

const port = 3000;
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/api/home", homeRoutes);
app.use("/api/add", addRoutes);
app.use(authRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
