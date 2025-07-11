import { ObjectId } from "mongodb";
import GameInfo from "./GameInfo";


export default class UserData {
    constructor(
        public History: {
            Game: GameInfo,
            gameStatus: "Solved"|"Attempted"|"Failed"
        }[], 
        public Guesses: number,
        public streak: number,
        public lastPlayed: Date,
    ) {}
}
