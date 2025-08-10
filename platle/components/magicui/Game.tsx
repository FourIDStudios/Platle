"use client";
 
import { cn } from "@/lib/utils";
import { AnimatedList} from "./animated-list";
import React from 'react'
import GameInfo from "@/models/GameInfo";
import UserData from "@/models/UserData";
import { Gamepad, RefreshCwOffIcon, User } from "lucide-react";
import { ObjectId } from "mongodb";
import { color, Color } from "motion";
import { GenreEnum } from "@/models/Enums/GenreEnums";
import { PlatformEnum } from "@/models/Enums/PlatformEnum";
import { renderPlatform } from "@/services/platformIconService";
import { GenreIconMap } from "@/models/Enums/GenreEnumIconMap";

type CardProps = {
    CurrentGuess: GameInfo | null;
    todaysGame: GameInfo;
};

type MatchesProps = {
    guess: GameInfo;
    game: GameInfo;
}

interface FieldData {
    name: string; // The name of the field (e.g., "Release Date")
    color: string,
    value: any; // The actual value of the field (e.g., 2023)
}

interface MatchValueProps {
    Fields: FieldData[]; // An array of FieldData objects
}

export function getGenreNames(ids: number[]): string[] {
  return ids.map(id => GenreEnum[id]);
}

export function getPlatformNames(ids: number[]): string[] {
  return ids.map(id => PlatformEnum[id]);
}

function getYear(dateStr: string | number): number {
  // If your field might already be a number, handle both
  if (typeof dateStr === "number") {
    // If it's a UNIX timestamp: new Date(dateStr * 1000).getFullYear();
    return dateStr; 
  }
  return parseInt(dateStr.substring(0, 4), 10);
}

const getMatches = (Props:MatchesProps):MatchValueProps => {
    let game = Props.game
    let guess = Props.guess
    let matches:MatchValueProps = {
        Fields: []
    }

    //Check Release Date Range (within 5 years)
    const guessYear = getYear(guess.first_release_date);
    const gameYear = getYear(game.first_release_date);
    if(guessYear+5 <= gameYear && guessYear-5 >= gameYear){
        matches.Fields.push({name: "Release Date", color: 'close',value: guessYear});
    }else if(guessYear === gameYear){
        matches.Fields.push({name: "Release Date", color: 'correct',value: guessYear });
    }else{
        matches.Fields.push({name: "Release Date", color: 'wrong',value: guessYear });
    }

    //Check Genres
    if(guess.genres.length > 0 && game.genres.length > 0){
        const genreMatches = guess.genres.filter(genre => game.genres.includes(genre));
        const genreNames = guess.genres
        if(genreMatches.length > 0 && genreMatches.length === game.genres.length){
            matches.Fields.push({name: "Genres", color: 'correct', value:genreNames});
        }else if(genreMatches.length > 0){
            matches.Fields.push({name: "Genres", color: 'close', value:genreNames});
        }else{
            matches.Fields.push({name: "Genres", color: 'wrong', value:genreNames});
        }
    }

    //Check Platforms
    if(guess.platforms.length > 0 && game.platforms.length > 0){
        const platformMatches = guess.platforms.filter(platform => game.platforms.includes(platform));
        const platformNames = guess.platforms;
        if(platformMatches.length > 0 && platformMatches.length === game.platforms.length){
            matches.Fields.push({name: "platforms", color: 'correct', value:platformNames });
        }else if(platformMatches.length > 0){
            matches.Fields.push({name: "platforms", color: 'close', value:platformNames});
        }else{
            matches.Fields.push({name: "platforms", color: 'wrong', value:platformNames});
        }
    }

    //Check total rating
    if(guess.total_rating === game.total_rating){
        matches.Fields.push({name: "Rating", color: 'correct', value:guess.total_rating});
    }else if(guess.total_rating > game.total_rating - 25 && guess.total_rating < game.total_rating + 25){
        matches.Fields.push({name: "Rating", color: 'close', value:guess.total_rating });
    }else{
        matches.Fields.push({name: "platforms", color: 'wrong', value:guess.total_rating });
    }

    //Check If Indie
    if(guess.isIndie && game.isIndie){
        matches.Fields.push({name: "isIndie", color: 'correct', value:"Indie"});
    }

    return matches;
};

const MatchModal: React.FC<FieldData> = (Field) => {
  return (
    <div>
      <span className="font-semibold">{Field.name}</span>
      <div className={"InfoEntry " + Field.color + " mb-2"}>
        {Array.isArray(Field.value) ? (
          <div className="InfoEntryContent flex flex-wrap gap-2 justify-center">
            
            {/* Platforms → icons */}
            {Field.name.toLowerCase() === "platforms" &&
              Field.value.map((platformId: number, idx: number) => (
                <div key={idx} className="flex items-center gap-1">
                  {renderPlatform(platformId)}
                </div>
              ))}

            {/* Genres → icons + label */}
            {Field.name.toLowerCase() === "genres" &&
              Field.value.map((genreId: number, idx: number) => (
                <div
                  key={idx}
                  className={"flex flex-col items-center gap-1 px-2 py-1 rounded-lg text-sm "}
                  title={GenreEnum[genreId]} // tooltip on hover
                >
                  {GenreIconMap[genreId] ?? <span>{GenreEnum[genreId]}</span>}
                </div>
              ))}

            {/* Generic array → colored chips */}
            {Field.name.toLowerCase() !== "platforms" &&
              Field.name.toLowerCase() !== "genres" &&
              Field.value.map((val: string, idx: number) => (
                <span
                  key={idx}
                  className={"px-3 py-1 rounded-lg text-sm " + Field.color}
                >
                  {val}
                </span>
              ))}

          </div>
        ) : (
          <span className="InfoEntryContent w-full h-full flex justify-center items-center">
            {Field.value}
          </span>
        )}
      </div>
    </div>
  );
};



const Card: React.FC<CardProps> = ({ CurrentGuess, todaysGame }) => {
    // You may need to adjust these variables to use the correct data from UserHistory or todaysGame
    //Show Daily Game Info
    if(CurrentGuess == null && todaysGame != null){
        return (
            <div className="GameInfoCard">
            <div className="absolute right-10 top-10 scale-75">
                <div className="position-absolute text-lg font-bold text-center"> Todays Game </div>
                <img src={todaysGame.cover} alt={todaysGame.name} className="CardBanner  blur-[20px]" />
            </div>
        </div>
    )
    }else if(CurrentGuess != null){
        let matches:MatchValueProps = getMatches({guess: CurrentGuess as GameInfo, game:todaysGame});
         return (
        <div className="GameInfoCard">
            <div>
                <img src={CurrentGuess.cover} alt={CurrentGuess.name} className="CardBanner" />
            </div>
            <div>
                <h2 className="text-xl font-bold text-slate-100 text-center">{CurrentGuess.name}</h2>
                <div className="mt-2">
                    <div className="InfoGrid text-center">
                        {matches.Fields.map((Field, index) => {
                            return(
                                <MatchModal name={Field.name} value={Field.value} color={Field.color}/>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );   
    }else{
        return (
            <div className="GameInfoCard">
                <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500"> Loading..., If this takes too long Please refresh the page!</p>
                </div>
            </div>
        );
    }
};

const Game = ({UserData,todaysGame, gameId}: {UserData: UserData|null, todaysGame:GameInfo|null, gameId:string|null}) => {
    if(!UserData || !todaysGame || !gameId){
        return <div className="GameInfoCard">Loading...</div>
    }else if(UserData.History == null || UserData.History.length == 0){
        return <div className="GameInfoCard">Make Your First Guess!</div>
    }else{
        return (
        <div className="GameContainer">
            <AnimatedList>
                {UserData.History.find(history => (history.dailyId as unknown as string) === gameId)?.guesses.map((currentGuess, index) =>(
                    <Card key={index} CurrentGuess={currentGuess} todaysGame={todaysGame as GameInfo} />
                ))}
            </AnimatedList>
        </div>
    )
    }
}

export {Game, Card, MatchModal};