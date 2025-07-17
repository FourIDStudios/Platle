import { connectToDatabase } from "./controllers/DatabaseController";
import { gamesRouter } from "./routes/gameRoutes";
import app from "./app";
import cron from "node-cron";
import { UpdateDatabase } from "./jobs/UpdateDatabase";
import { userRouter } from "./routes/userRoutes";


connectToDatabase()
.then(() => {
    console.log(`[0] Routing to the super-games server....`)
    app.use("/games", gamesRouter);
    console.log(`[0] Route Established!`)
    console.log(`[0] Routing to the awesome-users server....`)
    app.use("/user", userRouter);
    console.log(`[0] Route Established!`)
    console.log(`[0] Jarvis, it's go time!`)
    app.listen(process.env.SERVER_PORT, () =>{
        console.log(`[O] Playtle Server Is Online at http://localhost:${process.env.SERVER_PORT} :D`)
    });
    UpdateDatabase()
    cron.schedule('0 0 * * *', UpdateDatabase)
})
.catch((error: Error) => {
    console.error(`[X] Database connection failed :(| Er:${error}`)
    process.exit();
})
