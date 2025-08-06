import express, {Request, Response} from "express";
import { collections } from "../controllers/DatabaseController";
import UserData from "../models/UserData";
import GameInfo from "../models/GameInfo";
import { ObjectId } from "mongodb";



export const userRouter = express.Router();
userRouter.use(express.json());

//Endpoints

//--> Get ("/")
userRouter.get("/:id", async(req: Request, res:Response) => {
    const id:string = req?.params?.id as string;
    console.log(`Get With Id: ${req.params?.id}`)
    if(id == null){res.status(500).send("Invalid|Missing Id"); return;}

    let foundOrNewData:UserData;
    try {
        let userData = await collections.userdata?.findOne({userId:id});
        if(!userData){
            foundOrNewData = {
                userId: id,
                Guesses: 0,
                streak: 0,
                History: [],
                lastPlayed: new Date(),
            }
        
            //Create New UserData
            await collections.userdata?.insertOne(foundOrNewData);
            console.log("[O]: Created New UserData:", foundOrNewData);
        }else{
            foundOrNewData = {
                userId: userData.userId,
                Guesses: userData.Guesses,
                streak: userData.streak,
                History: userData.History,
                lastPlayed: userData.lastPlayed,
            }
            console.log("[O]: Fetched UserData:", foundOrNewData);
        }
        
        res.status(200).send(foundOrNewData);
    }catch(error){
        if (error instanceof Error) {
            res.status(500).send(error.message);
            return;
        } else {
            res.status(500).send("An unknown error occurred");
            return;
        }
    }
})


//--> Put ("/")
userRouter.put("/:id", async(req: Request, res:Response) => {
    const id:string = req?.params?.id;
    if(id == null){
        res.status(500).send("Invalid|Missing Id")
        return;
    }

    try {
        let newuserData = req.body as UserData;
        const query = {userId: id}

        const result = await collections.userdata?.updateOne(query, {$set: newuserData});

        result
            ?res.status(200).send(`Successfully updated user data`)
            :res.status(304).send(`Failed to update profile id:${id}`)
        return;
    }catch(error){
        if (error instanceof Error) {
            res.status(400).send(error.message);
            return;
        } else {
            res.status(400).send("An unknown error occurred");
            return;
        }
    }
})

//--> Post ("/:id/games/:dailyId/guess")
userRouter.post("/:id/games/:dailyId/guess", async(req: Request, res: Response) => {
    const userId = req?.params?.id;
    const dailyId = req?.params?.dailyId;

    if(userId == null || dailyId == null){
        res.status(500).send("Invalid|Missing Id")
        return;
    }

    let userData= await collections.userdata?.findOne({userId:userId});
    if(!userData){ res.status(404).send("User not found"); return;}
    if(!userData.History){userData.History = [];}

    const newGuess = req.body.guess as GameInfo;
    const historyEntry = userData.History.find(entry => entry.dailyId.toHexString() === dailyId);
    
    if(historyEntry){
        //Push New Guess & Update Existing Entry
        historyEntry.guesses.push(newGuess);
        historyEntry.hintUsed = req.body.hintUsed || false;
        historyEntry.gameStatus = req.body.gameStatus || "Attempted";
    }else{
        //Create New Entry, With Guess Included
        userData.History.push({
            dailyId: new ObjectId(dailyId),
            guesses: [newGuess],
            hintUsed: req.body.hintUsed || false,
            gameStatus: req.body.gameStatus || "Attempted",
            dayCreated: new Date().toISOString(),
        });
    }
    userData.lastPlayed = new Date();
    userData.Guesses += 1;
    if(req.body.gameStatus === "Solved"){
        userData.streak += 1;
    }else{
        userData.streak = 0;
    }
    //Update UserData in Database
    await collections.userdata?.updateOne({userId: userId}, {$set: userData});
    res.status(200).send("Guess recorded successfully");
    return;
});