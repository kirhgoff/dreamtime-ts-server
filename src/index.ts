import "reflect-metadata";
import express, { Application } from "express";
import helmet from "helmet";
import cors from "cors";
import { createConnection } from "typeorm";
import morgan from "morgan";

import Router from "./routes";
import dbConfig from "./config/database";

const PORT = process.env.PORT || 8000;

const app: Application = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

app.use('/api/v1', Router);

createConnection(dbConfig)
  .then(_connection => {
    app.listen(PORT, () => {
      console.log("Server is running on port", PORT);
    });
  })
  .catch(err => {
    console.log("Unable to connect to db", err);
    process.exit(1);
  });
