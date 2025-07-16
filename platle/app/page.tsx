import Game from "@/components/magicui/Game";
import GameInfo from "@/models/GameInfo";


interface GameSettings {
  maxGuesses: 5,
  allowAfterMax: true,
}

const Settings: GameSettings = {
  maxGuesses: 5,
  allowAfterMax: true
}

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

