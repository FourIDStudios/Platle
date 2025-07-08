import Game from "@/components/magicui/Game";
import Image from "next/image";

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

export default function Home() {
  return (
    <div className="Body">
      <Game GameData={testGameData}></Game>
    </div>
  );
}
