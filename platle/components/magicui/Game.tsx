"use client";
 
import { cn } from "@/lib/utils";
import { AnimatedList} from "./animated-list";
import React from 'react'
import GameInfo from "@/models/GameInfo";

const Card = ({name, cover, first_release_date, genres, total_rating,}: GameInfo) => {
    return (
        <div className="GameInfoCard">
            <div>
                <img src={cover} alt={name} className="CardBanner" />
            </div>
            <div>
                <h2 className="text-xl font-bold text-slate-100 text-center">{name}</h2>
                <div className="mt-2">
                    <div className="InfoGrid text-center">
                        <button className="InfoEntry">
                            Release Date: {first_release_date}
                        </button>
                        <button className="InfoEntry">
                            genres: {genres}
                        </button>
                        <button className="InfoEntry">
                            Rating: {total_rating}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Game = ({GameData}: {GameData: GameInfo[]}) => {
  return (
    <div className="GameContainer">
        <AnimatedList>
            {GameData.map((game, index) => (
                <Card {...game} key={index}  />
            ))}
        </AnimatedList>
    </div>
  )
}

export default Game