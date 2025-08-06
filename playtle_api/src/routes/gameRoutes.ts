import express, {Request, Response} from "express";
import { ObjectId } from "mongodb";
import GameInfo from "../models/GameInfo";
import { collections } from "../controllers/DatabaseController";
import HistoryInstance from "../models/HistoryInstance";
import { error } from "console";


export const gamesRouter = express.Router();
gamesRouter.use(express.json());

//#region Handlers
//--> Get ("/")
gamesRouter.get("/", async(_req: Request, res: Response) => {
    try{
        const docs = await collections.games?.find({}).toArray();
        const games: GameInfo[] = docs
            ? docs.map(doc => ({
                name: doc.name, 
                cover: doc.cover, 
                first_release_date: doc.first_release_date, 
                platforms: doc.platforms, 
                genres: doc.genres, 
                involved_companies: doc.involved_companies,
                total_rating: doc.total_rating,
                isIndie: doc.isIndie,
                id: doc.id
            }))
            : [];
        res.status(200).send(games);
    }catch(error){
        if (error instanceof Error) {
            res.status(500).send(error.message);
        } else {
            res.status(500).send("An unknown error occurred");
        }
    }
})

gamesRouter.get("/daily", async(_req: Request, res: Response) => {
    try{
        const dateOnly = new Date().toISOString().split("T")[0];
        
        // Check if today's entry already exists
        const dailyExists = await collections.gameHistory?.findOne({ dateCreated: dateOnly });
        if (dailyExists) {
            // Fetch Game 
            const foundGame = await collections.games?.findOne({id: dailyExists.gameId})
            // Construct and insert the daily entry
            if(foundGame){
                const DailyEntry:GameInfo = {
                    name: foundGame.name, 
                    cover: foundGame.cover, 
                    first_release_date: foundGame.first_release_date, 
                    platforms: foundGame.platforms, 
                    genres: foundGame.genres, 
                    involved_companies: foundGame.involved_companies,
                    total_rating: foundGame.total_rating,
                    isIndie: foundGame.isIndie,
                    id: foundGame.id
                };
                res.status(200).send({GameInfo:DailyEntry, DailyId: dailyExists._id.toHexString()})
                return;
            }else{
                res.status(500).send("Failed to fetch today's game entry.");
                return;
            }
        }

        // Get all previously used game IDs
        const usedGames = await collections.gameHistory?.find({}, { projection: { gameId: 1 } }).toArray();
        const usedGameIds = usedGames?.map(entry => entry.gameId) ?? [];
        
        // Sample a random game that hasn't been used
        const randomGame = await collections.games?.aggregate([
            { $match: { id: { $nin: usedGameIds } } },
            { $sample: { size: 1 } }
        ]).toArray();

        const dailyRandom = randomGame?.[0];

        if (!dailyRandom) {
            console.error("[X]: No unused games available for daily entry.");
            return;
        }

        // Construct and insert the daily entry
        const DailyEntry = {
            name: dailyRandom.name, 
            cover: dailyRandom.cover, 
            first_release_date: dailyRandom.first_release_date, 
            platforms: dailyRandom.platforms, 
            genres: dailyRandom.genres, 
            involved_companies: dailyRandom.involved_companies,
            total_rating: dailyRandom.total_rating,
            isIndie: dailyRandom.isIndie,
            id: dailyRandom.id
        };

        const HistoryEntry = {
            gameId: dailyRandom.id,
            dateCreated: dateOnly,
        }

        const result = await collections.gameHistory?.insertOne(HistoryEntry);

        if (result?.acknowledged) {
            console.log("[O]: Daily game entry created:", DailyEntry);
            res.status(200).send(DailyEntry);
            return;
        } else {
            console.error("[X]: Failed to insert daily game entry.");
            res.status(500).send("[X]: Failed to insert daily game entry.");
            return;
        }

    }catch(error){
        if (error instanceof Error) {
            res.status(500).send(error.message);
        } else {
            res.status(500).send("An unknown error occurred");
        }
    }
})

//--> Get ("/:id")
gamesRouter.get("/:id", async(req: Request, res: Response) => {
    const id = req?.params?.id;
    if(id == null){res.status(500).send("Invalid|Missing Id")}

    try{
        const query = {_id: new ObjectId(id)};
        const doc = await collections.games?.findOne(query);
        if (!doc) {
            res.status(404).send("Game not found");
            return;
        }
        const game: GameInfo = {
            name: doc.name, 
            cover: doc.cover, 
            first_release_date: doc.first_release_date, 
            platforms: doc.platforms, 
            genres: doc.genres, 
            involved_companies: doc.involved_companies,
            total_rating: doc.total_rating,
            isIndie: doc.isIndie,
            id: doc.id
        };

        res.status(200).send(game);
    }catch(error){
        if (error instanceof Error) {
            res.status(500).send(error.message);
        } else {
            res.status(500).send("An unknown error occurred");
        }
    }
})
//--> Post ("/")
gamesRouter.post("/", async(req: Request, res: Response) => {
    try{
        const newGame = req.body as GameInfo;
        const result = await collections.games?.insertOne(newGame);

        result
            ? res.status(201).send(`Successfully created a new game with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new game.");
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        } else {
            res.status(500).send("An unknown error occurred");
        }
    }
})
//--> Put ("/:id")
gamesRouter.put("/:id", async(req: Request, res: Response) => {
    const id = req?.params?.id;
    if(id == null){res.status(500).send("Invalid|Missing Id")}

    try{
        const updatedGame = req.body as GameInfo;
        const query = {_id: new Object(id)}

        const result = await collections.games?.updateOne(query, {$set: updatedGame});

        result
            ? res.status(200).send(`Successfully updated a game with id ${id}`)
            : res.status(304).send(`Game with id:${id} failed to update`);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).send(error.message);
            } else {
                res.status(400).send("An unknown error occurred");
            }
        }
})
//--> Del ("/:id")
gamesRouter.delete("/:id", async(req: Request, res: Response) => {
    const id = req?.params?.id;
    if(id == null){res.status(500).send("Invalid|Missing Id")}

    try{
        const query = {_id: new ObjectId(id)};
        const result = await collections.games?.deleteOne(query);
        
        if(result && result.deletedCount){
            res.status(202).send(`Sucessfully removed game with id ${id}`)
        }else if(!result){
            res.status(400).send(`Failed to remove game with id ${id}`);
        }else if(!result.deletedCount){
            res.status(404).send(`Game with id ${id} does not exist`);
        }
    }catch(error){
        if (error instanceof Error) {
            res.status(400).send(error.message);
        } else {
            res.status(400).send("An unknown error occurred");
        }
    }
})
//#endregion