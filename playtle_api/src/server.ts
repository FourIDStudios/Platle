import { connectToDatabase } from "./controllers/DatabaseController";
import { gamesRouter } from "./routes/gameRoutes";
import app from "./app";
import cron from "node-cron";
import { UpdateDatabase } from "./jobs/UpdateDatabase";


connectToDatabase()
.then(() => {
    app.use("/games", gamesRouter);
    app.listen(process.env.SERVER_PORT, () =>{
        console.log(`[O] Playtle Server Is Online at http://localhost:${process.env.SERVER_PORT} :D`)
    });
    cron.schedule('0 0 * * *', UpdateDatabase)
})
.catch((error: Error) => {
    console.error(`[X] Database connection failed :(| Er:${error}`)
    process.exit();
})
