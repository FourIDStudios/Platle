import express from "express";
import { connectToDatabase } from "./controllers/DatabaseController";
import { gamesRouter } from "./routes/gameRoutes";
import app from "./app";
import { error } from "console";





connectToDatabase()
.then(() => {
    app.use("/games", gamesRouter);
    app.listen(process.env.SERVER_PORT, () =>{
        console.log(`[O] Playtle Server Is Online at http://localhost:${process.env.SERVER_PORT} :D`)
    });
})
.catch((error: Error) => {
    console.error(`[X] Database connection failed :(| Er:${error}`)
    process.exit();
})
