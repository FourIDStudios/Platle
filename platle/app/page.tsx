import Game from "@/components/magicui/Game";
import { number } from "motion";
import Image from "next/image";
import axios from "axios";
import { fetchGames } from "@/services/games.service";
import GameInfo from "@/models/GameInfo";
import { connectToDatabase } from "@/services/database.service";
import { gamesRouter } from "@/routes/GamesController";


let testGameData:GameInfo[];
interface Game{
  id: number,
  name: string,
  cover: string, 
  first_release_date: string,
  genres: number[],
  releaseDate: string, 
  player_perspectives: number[], 
  rating: number
}

interface GameSettings {
  maxGuesses: 5,
  allowAfterMax: true,
}


const Settings: GameSettings = {
  maxGuesses: 5,
  allowAfterMax: true
}

//fetchIGDBGames();

// Example usage (uncomment to fetch on server start)
// fetchIGDBGames();

//If none exist, create a query for random data,

//<Game GameData={testGameData}></Game>

export default function Home() {
  return (
    <div className="Body">
      
    </div>
  );
}
function express() {
  throw new Error("Function not implemented.");
}

