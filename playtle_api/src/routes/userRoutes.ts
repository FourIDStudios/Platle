import express, {Request, Response} from "express";
import { collections } from "../controllers/DatabaseController";
import UserData from "../models/UserData";



export const userRouter = express.Router();
userRouter.use(express.json());

//Endpoints

//--> Get ("/:id")
userRouter.get("/:id", async(req: Request, res:Response) => {
    const id:string = req?.params?.id;
    if(id == null){res.status(500).send("Invalid|Missing Id")}

    let foundOrNewData:UserData;
    try {
        let userData = await collections.userdata?.findOne({userId:id});
        if(!userData){
            foundOrNewData = {
                userId: id,
                Guesses: 0,
                streak: 0,
                History: [],
            }
        }else{
            foundOrNewData = {
                userId: `${userData.id}`,
                Guesses: userData.Guesses,
                streak: userData.streak,
                History: userData.History,
                lastPlayed: userData.lastPlayed,
            }
        }

        res.status(200).send(foundOrNewData);
    }catch(error){
        if (error instanceof Error) {
            res.status(500).send(error.message);
        } else {
            res.status(500).send("An unknown error occurred");
        }
    }
})


//--> Put ("/:id")
userRouter.put("/:id", async(req: Request, res:Response) => {
    const id:string = req?.params?.id;
    if(id == null){res.status(500).send("Invalid|Missing Id")}

    try {
        let newuserData = req.body as UserData;
        const query = {userId: id}

        const result = await collections.userdata?.updateOne(query, {$set: newuserData});

        result
            ?res.status(200).send(`Successfully updated user data`)
            :res.status(304).send(`Failed to update profile id:${id}`)
    }catch(error){
        if (error instanceof Error) {
            res.status(400).send(error.message);
        } else {
            res.status(400).send("An unknown error occurred");
        }
    }
})
