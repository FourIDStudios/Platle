import Game from "@/components/magicui/Game";
import { number } from "motion";
import Image from "next/image";
import axios from "axios";

let testGameData = [
    {
        id: "1",
        name: "The Legend of Zelda: Tears of the Kingdom",
        description: "An epic action-adventure game set in the vast world of Hyrul",
        imageUrl: "https://static1.srcdn.com/wordpress/wp-content/uploads/2024/11/legend-of-zelda-movie.jpg",
        releaseDate: "2023-05-12",
        genre: "Action-Adventure",
        developer: "Nintendo",
        rating: 9.5,
        totalPlayers: 1000000
    },
    {
        id: "2",
        name: "Super Mario Odyssey",
        description: "A 3D platformer that takes Mario on a globe-trotting adventure.",
        imageUrl: "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000001130/c42553b4fd0312c31e70ec7468c6c9bccd739f340152925b9600631f2d29f8b5",
        releaseDate: "2017-10-27",
        genre: "Platformer",
        developer: "Nintendo",
        rating: 9.7,
        totalPlayers: 5000000
    },
    {
        id: "3",
        name: "Animal Crossing: New Horizons",
        description: "A life simulation game where players create and manage their own island.",
        imageUrl: "https://assets.nintendo.com/image/upload/q_auto/f_auto/ncom/software/switch/70010000027619/9989957eae3a6b545194c42fec2071675c34aadacd65e6b33fdfe7b3b6a86c3a",
        releaseDate: "2020-03-20",
        genre: "Simulation",
        developer: "Nintendo",
        rating: 9.2,
        totalPlayers: 20000000,
    }
]
testGameData = Array.from({length:3}, () => testGameData).flat();

interface GameQuery {
    count: number
    clientId: string
    authToken: string
}


//Check For Data/Json with todays date
const IGDB_API_URL = `${process.env.REACT_APP_BASE_URL}/games/?fields=id,name,rating,first_release_date,cover,genres,player_perspectives&limit=100`;

async function fetchIGDBGames() {
  try {
    const response = await axios.post(
      IGDB_API_URL,
      "",
      {
        headers: {
          "Client-ID": process.env.REACT_APP_CLIENT_ID || "",
          "Authorization": `Bearer ${process.env.REACT_APP_ACCESS_TOKEN || ""}`,
          "Accept": "application/json"
        }
      }
    );
    testGameData = response.data.map((game: any) => ({
      id: game.id.toString(),
      name: game.name,
      description: "", // No description in response, leave blank or fetch separately
      imageUrl: "", // No image URL in response, would need to resolve cover ID to URL
      releaseDate: game.first_release_date
        ? new Date(game.first_release_date * 1000).toISOString().split("T")[0]
        : "",
      genre: Array.isArray(game.genres) ? game.genres.join(",") : "",
      developer: "", // Not present in response
      rating: game.rating || 0,
      totalPlayers: 0, // Not present in response
    }));
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching IGDB games:", error);
    return null;
  }
}

fetchIGDBGames();

// Example usage (uncomment to fetch on server start)
// fetchIGDBGames();

//If none exist, create a query for random data,

export default function Home() {
  return (
    <div className="Body">
      <Game GameData={testGameData}></Game>
    </div>
  );
}
