import { ObjectId } from "mongodb";
import { collections } from "../controllers/DatabaseController";
import { fetchGames } from "../controllers/GamesController";
import GameInfo from "../models/GameInfo";

export async function UpdateDatabase() {
    //Check For Active Jobs
    console.log(`[O]: Checking for database jobs...:`)
    const jobs = await collections.jobs?.find({isActive:true, type:"database"}).toArray();
    if(!jobs){
        console.log(`[O]: No Active Database Jobs Found`)
        return;
    } 

    console.log(`[O]: ${jobs.length} Active Database Jobs Found, Checking schedule....`)
    //Get Current Date
    const now = new Date();

    for (const job of jobs){
        //Cache|Default last run
        const lastRun = job.lastRun ?? new Date(0);
        const daysSince = (now.getTime() - lastRun.getTime()) / (1000 * 60 * 60 * 24);
        let logIndex = 0;

        //Job Logic
        if(daysSince > job.intervalDays){
            try {
                //Begin Operation
                console.log(`[O]: Found Scheduled Database Job: ${job.name}...`)
                console.log(`[O..${++logIndex}]: Running Database Job(s): ${job.name}...`)
                
                //Fetch Games
                console.log(`[O..${++logIndex}]: Executing Game Fetch...`)
                let Games:GameInfo[] = await fetchGames();

                //Update Database
                Games.forEach(async game => {
                    //Check For Existing Element
                    const doesExist = await collections.games?.findOne({name: game.name});
                    if(doesExist) {
                        console.log(`[O..${++logIndex}]: Skipping duplicate game entry: ${game.name}...`)
                        return;
                    }

                    //Post Game To DB
                    console.log(`[O..${++logIndex}]: Adding game entry to database: ${game.name}...`)
                    try{
                        const result = collections.games?.insertOne(game);
                
                        result
                            ? console.log(`[O..${++logIndex}]: Successfully inserted a new game:${game}`)
                            : console.log(`[O..${++logIndex}]: Failed to insert a new game :${game}.`);
                    } catch (error) {
                        if (error instanceof Error) {
                            console.log(`[O..${++logIndex}]: Failed to insert a new game:${game}, Error:${error.message}`);
                        } else {
                            console.log(`[O..${++logIndex}]: Failed to insert a new game:${game}, Error:Unknown`);
                        }
                    }
                });
            }catch(error){
                console.log(`[O..${++logIndex}]: Error running Job: ${job.name}`);
                console.log(`[O..${++logIndex}]: Error caught while updating database, Error: ${error}`);
            }
        }
    }
}