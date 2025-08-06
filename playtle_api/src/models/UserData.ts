import { ObjectId } from "mongodb";
import GameInfo from "./GameInfo";


export default class UserData {
    constructor(
        public userId: string,
        public Guesses: number = 0,
        public streak: number = 0,
        public lastPlayed?: Date,
        public History?: {
            dailyId: ObjectId,
            guesses: GameInfo[],
            dayCreated: string,
            hintUsed: boolean,
            gameStatus: "Solved"|"Attempted"|"Failed"
        }[], 
        public id?: ObjectId
    ) {}
}
