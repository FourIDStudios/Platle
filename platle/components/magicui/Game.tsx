"use client";
 
import { cn } from "@/lib/utils";
import { AnimatedList} from "./animated-list";
import React from 'react'
import GameInfo from "@/models/GameInfo";
import UserData from "@/models/UserData";
import { User } from "lucide-react";
import { ObjectId } from "mongodb";

type CardProps = {
    CurrentGuess: GameInfo;
    todaysGame: GameInfo;
};

const Card: React.FC<CardProps> = ({ CurrentGuess, todaysGame }) => {
    // You may need to adjust these variables to use the correct data from UserHistory or todaysGame
    return (
        <div className="GameInfoCard">
            <div>
                <img src={CurrentGuess.cover} alt={CurrentGuess.name} className="CardBanner" />
            </div>
            <div>
                <h2 className="text-xl font-bold text-slate-100 text-center">{CurrentGuess.name}</h2>
                <div className="mt-2">
                    <div className="InfoGrid text-center">
                        <button className="InfoEntry">
                            Release Date: {CurrentGuess.first_release_date}
                        </button>
                        <button className="InfoEntry">
                            genres: {CurrentGuess.genres.join(", ")|| "N/A"}
                        </button>
                        <button className="InfoEntry">
                            Rating: {CurrentGuess.total_rating}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
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
                {UserData.History.find(history => history.dailyId === gameId)?.guesses.map((currentGuess, index) =>(
                    <Card key={index} CurrentGuess={currentGuess} todaysGame={todaysGame as GameInfo} />
                ))}
            </AnimatedList>
        </div>
    )
    }
}

export default Game