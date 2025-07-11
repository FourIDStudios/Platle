import express from "express";
import { connectToDatabase } from "./database.service";
import { gamesRouter } from "@/routes/GamesController";

const app = express();
const port = 5000;

connectToDatabase()
  .then(() => {
    app.use("/games", gamesRouter);
    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed", error);
    process.exit();
  });

connectToDatabase();