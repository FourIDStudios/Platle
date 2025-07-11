import express, {Request, Response} from "express";
import { ObjectId } from "mongodb";
import { Collection } from "mongodb";
import GameInfo from "@/models/GameInfo";
import { collections } from "@/services/database.service";


export const gamesRouter = express.Router();
gamesRouter.use(express.json());

//#region Handlers
//--> Get ("/")
gamesRouter.get("/", async(_req: Request, res: Response) => {
    try{
        const docs = await collections.games?.find({}).toArray();
        const games: GameInfo[] = docs
            ? docs.map(doc => ({
                id: doc._id,
                name: doc.name,
                cover: doc.cover,
                first_release_date: doc.first_release_date,
                genres: doc.genres,
                rating: doc.rating, 
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
//--> Get ("/:id")
gamesRouter.get("/", async(req: Request, res: Response) => {
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
            id: doc._id,
            name: doc.name,
            cover: doc.cover,
            first_release_date: doc.first_release_date,
            genres: doc.genres,
            rating: doc.rating,
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
gamesRouter.get("/", async(req: Request, res: Response) => {
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