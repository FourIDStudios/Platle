import * as mongoDB from "mongodb";
import * as dotenv from "dotenv"
import { fetchGames } from "./GamesController";
import GameInfo from "../models/GameInfo";
import axios from "axios";

export const collections:{
    games?: mongoDB.Collection, 
    userdata?:mongoDB.Collection,
    gameHistory?:mongoDB.Collection,
} = {}
let connURI;

//#region  Database Functions
export async function connectToDatabase() {
    dotenv.config();

    //Generate Connection URI
    connURI = `mongodb+srv://${process.env.DB_CONN_NAME}:${process.env.DB_CONN_PASS}@playtle.gln3ch7.mongodb.net/?retryWrites=true&w=majority&appName=Playtle`

    //Connect Client
    const client: mongoDB.MongoClient = new
        mongoDB.MongoClient(connURI);
    await client.connect();

    //Connect To Db
    const db: mongoDB.Db = client.db(process.env.DB_NAME);
    
    try{
        collections.games = db.collection("GameData");
        collections.userdata = db.collection("UserData")
        collections.gameHistory = db.collection("GameHistory")
    }catch(error){
        console.log(`Failed To Fetch Collections: Err:${error} `)
    }

    console.log(`Successfully connected to database: ${db.databaseName} and collections: ${collections.userdata, collections.games, collections.gameHistory}`);
}

export async function UpdateDB()
{
    let gameData:GameInfo[] = await fetchGames()

    gameData.forEach(async (game) => {
    try{
        await axios.post(`http://localhost:5000/games`, gameData);
            
    }catch(error){
        console.error("Error fetching IGDB games:", error);
        return null;
    }
    })
}
//#endregion