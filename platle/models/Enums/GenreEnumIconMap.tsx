import { FiMusic, FiStar } from "react-icons/fi";
import { FaChessBoard, FaChessRook, FaDice, FaGamepad, FaHatWizard, FaPuzzlePiece } from "react-icons/fa";
import { GiBoxingGlove, GiPistolGun, GiArena, GiTreasureMap, GiPinballFlipper, GiSaberSlash, GiDiceShield, GiSoccerBall, GiBattleTank, GiSteeringWheel, GiFloatingPlatforms } from "react-icons/gi";
import { GenreEnum } from "@/models/Enums/GenreEnums";
import { JSX } from "react";
import { SiApplearcade, SiOculus } from "react-icons/si";
import { FaPerson } from "react-icons/fa6";
import { MdAdsClick, MdQuiz } from "react-icons/md";

export const GenreIconMap: Record<number, JSX.Element> = {
  [GenreEnum.PointAndClick]: <MdAdsClick title="Point and Click" />,
  [GenreEnum.Fighting]: <GiBoxingGlove title="Fighting" />,
  [GenreEnum.Shooter]: <GiPistolGun title="Shooter" />,
  [GenreEnum.Music]: <FiMusic title="Music" />,
  [GenreEnum.Platform]: <GiFloatingPlatforms title="Platform" />,
  [GenreEnum.Puzzle]: <FaPuzzlePiece title="Puzzle" />,
  [GenreEnum.Racing]: <GiSteeringWheel title="Racing" />,
  [GenreEnum.RealTimeStrategyRTS]: <GiBattleTank title="RTS" />,
  [GenreEnum.RolePlayingRPG]: <FaHatWizard title="RPG" />,
  [GenreEnum.Simulator]: <SiOculus title="Simulator" />,
  [GenreEnum.Sport]: <GiSoccerBall title="Sport" />,
  [GenreEnum.Strategy]: <FaChessRook title="Strategy" />,
  [GenreEnum.TurnBasedStrategyTBS]: <FaDice title="TurnBased Strategy" />,
  [GenreEnum.Tactical]: <GiDiceShield title="Tactical" />,
  [GenreEnum.HackAndSlash_BeatEmUp]: <GiSaberSlash title="Hack and Slash" />,
  [GenreEnum.Quiz_Trivia]: <MdQuiz title="Quiz/Trivia" />,
  [GenreEnum.Pinball]: <GiPinballFlipper title="Pinball" />,
  [GenreEnum.Adventure]: <GiTreasureMap title="Adventure" />,
  [GenreEnum.Indie]: <FaPerson title="Indie" />,
  [GenreEnum.Arcade]: <SiApplearcade title="Arcade" />,
  [GenreEnum.VisualNovel]: <FiStar title="Visual Novel" />,
  [GenreEnum.CardAndBoardGame]: <FaChessBoard title="Card and Board Game" />,
  [GenreEnum.MOBA]: <GiArena title="MOBA" />,
};
