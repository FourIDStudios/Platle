import Game from "@/components/magicui/Game";
import GameInfo from "@/models/GameInfo";
import { ObjectId } from "mongodb";


let testGameData:GameInfo[] = [
  {
    id: new ObjectId(12314123), name: 'The Dream Team',
    cover: "https://media.licdn.com/dms/image/v2/D5622AQEGLSacHV-VtQ/feedshare-shrink_2048_1536/B56ZcpRMfTGQAw-/0/1748744067039?e=1755734400&v=beta&t=epH_Oeg7Y6dx0D3qAuIG0d9KAo9SM1jTo1GaFQH25TE",
    first_release_date: 0,
    genres: ['Action', 'Adventure', 'Indie'],
    rating: 0
  },
    {
    id: new ObjectId(12314123), name: 'The Dream Team',
    cover: "https://media.licdn.com/dms/image/v2/D5622AQEGLSacHV-VtQ/feedshare-shrink_2048_1536/B56ZcpRMfTGQAw-/0/1748744067039?e=1755734400&v=beta&t=epH_Oeg7Y6dx0D3qAuIG0d9KAo9SM1jTo1GaFQH25TE",
    first_release_date: 0,
    genres: ['Action', 'Adventure', 'Indie'],
    rating: 0
  },
    {
    id: new ObjectId(12314123), name: 'The Dream Team',
    cover: "https://media.licdn.com/dms/image/v2/D5622AQEGLSacHV-VtQ/feedshare-shrink_2048_1536/B56ZcpRMfTGQAw-/0/1748744067039?e=1755734400&v=beta&t=epH_Oeg7Y6dx0D3qAuIG0d9KAo9SM1jTo1GaFQH25TE",
    first_release_date: 0,
    genres: ['Action', 'Adventure', 'Indie'],
    rating: 0
  },
    {
    id: new ObjectId(12314123), name: 'The Dream Team',
    cover: "https://media.licdn.com/dms/image/v2/D5622AQEGLSacHV-VtQ/feedshare-shrink_2048_1536/B56ZcpRMfTGQAw-/0/1748744067039?e=1755734400&v=beta&t=epH_Oeg7Y6dx0D3qAuIG0d9KAo9SM1jTo1GaFQH25TE",
    first_release_date: 0,
    genres: ['Action', 'Adventure', 'Indie'],
    rating: 0
  }
];
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
      <Game GameData={testGameData}></Game>
    </div>
  );
}
function express() {
  throw new Error("Function not implemented.");
}

