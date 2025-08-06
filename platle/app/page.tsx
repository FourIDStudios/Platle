
'use client'

import UserData from "@/models/UserData";
import { fetchDaily, fetchGames, fetchUser, makeGuess } from "@/services/playtleService";
import { randomBytes, randomUUID } from "crypto";
import { useEffect, useState } from "react";
import GameInfo from "@/models/GameInfo";
import Header from "@/components/header/header";
import Game from "@/components/magicui/Game";
import SearchBox from "@/components/autocomplete/searchbox";

interface GameSettings {
  maxGuesses: 5,
  allowAfterMax: true,
}

const Settings: GameSettings = {
  maxGuesses: 5,
  allowAfterMax: true
}
const playtle_data_key = "playtle_user_id"

export default function Home() {
  const [user, setUser] = useState<UserData | null>(null);
  const [dailyGame, setDailyGame] = useState<{GameInfo:GameInfo, DailyId:string} | null>(null);
  const [games, setGames] = useState<GameInfo[] | null>([]);

  //#region User Auth
  useEffect(() => {
    const initializeUser = async () => {
      if(typeof window !== 'undefined'){
    
      let userId = localStorage.getItem(playtle_data_key)
      if(!userId) { 
          userId = Date.now().toString(36) + Math.random().toString(36).substring(2);
          localStorage.setItem(playtle_data_key, userId)
      }

      try {
        const fetchedUser = await fetchUser(userId);
        setUser(fetchedUser);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
      }
    };
    initializeUser();

    const initializeDailyGame = async () => {
      try {
        const gameData = await fetchDaily();
        setDailyGame(gameData);
      } catch (error) {
        console.error("Error fetching daily game:", error);
      }
    }
    initializeDailyGame();

    const initializeGames = async () => {
      try {
        const gamesData = await fetchGames();
        setGames(gamesData);
      } catch (error) {
        console.error("Error fetching all games:", error);
      }
    };
    initializeGames();
  }, []);
  //#endregion


  const handleGuess = async(gameName: string) => {
    if(!user || !dailyGame) return;

    const guess = games?.find(game => game.name.toLowerCase() === gameName.toLowerCase());
    if(!guess) {
      console.error("Game not found in the list of games");
      return;
    }

    try {
      await makeGuess(user.userId, dailyGame, guess);
      const updatedUserData = await fetchUser(user.userId);
      setUser(updatedUserData);
    } catch (error) {
      console.error("Error making guess:", error);
    }
  }

  //#region  Page
  return (
    <div className="Body">
      <Header Title="Platle" UserName={user?.userId || "Loading..."}></Header>
      <SearchBox games={games?.map(game => game.name) || [] }
       OnSelect={handleGuess} />
        <Game UserData={user} todaysGame={dailyGame?.GameInfo || null} gameId={dailyGame?.DailyId || null}></Game>
    </div>
  );
  //#endregion
}