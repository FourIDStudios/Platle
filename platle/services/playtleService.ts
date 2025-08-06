import GameInfo from "@/models/GameInfo";
import UserData from "@/models/UserData";
import axios from "axios";



//#region  User data

export async function fetchUser(userId:string){
    const userEndpoint = `http://localhost:4000/users/${userId}`;

    try{
        const res = await axios.get(userEndpoint,{
            headers:{
              "Access-Control-Allow-Origin": true,
            },
        });
        const userData:UserData = res.data
        
        console.log("[O]: Fetched UserData:", userData);
        return userData;
    }catch(error){
        console.error("[X]: Error fetching UserData:", error);
        return null;
    }
}


export async function fetchDaily(){
    const dailyEndpoint = `http://localhost:4000/games/daily`;
    try{
        const res = await axios.get(dailyEndpoint,{
            headers:{
              "Access-Control-Allow-Origin": true,
            },
        });
        console.log("[O]: Fetched Daily Game:", res.data);
        return {GameInfo: res.data.GameInfo, DailyId: res.data.DailyId};
    }catch(error){
        console.error("[X]: Error fetching Daily Game:", error);
        return null;
    }
}

export async function fetchGames(){
    const gamesEndpoint = `http://localhost:4000/games`;
    try{
        const res = await axios.get(gamesEndpoint,{
            headers:{
              "Access-Control-Allow-Origin": true,
            },
        });
        const gamesData:GameInfo[] = res.data;
        console.log("[O]: Fetched Games:", gamesData);
        return gamesData;
    }catch(error){
        console.error("[X]: Error fetching Games:", error);
        return null;
    }
}

export async function makeGuess(userId: string, dailyGame: {GameInfo: GameInfo, DailyId: String}, guess: GameInfo) {
    const guessEndpoint = `http://localhost:4000/users/${userId}/games/${dailyGame.DailyId}/guess`;

    try {
        const res = await axios.post(guessEndpoint, {
            guess: guess,
            hintUsed: false,
            gameStatus: guess.id === dailyGame.GameInfo.id ? "Solved" : "Attempted"
         }, {
            headers: {
                "Access-Control-Allow-Origin": true,
            },
        });
        console.log("[O]: Made a Guess:", res.data);
        return res.data;
    } catch (error) {
        console.error("[X]: Error making a Guess:", error);
        return null;
    }
}
//#endregion