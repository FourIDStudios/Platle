"use client";
 
import { cn } from "@/lib/utils";
import { AnimatedList} from "./animated-list";
import React from 'react'

interface GameEntry {
    id: string
    name: string
    description: string
    imageUrl: string
    releaseDate: string
    genre: string
    developer: string
    rating: number
    totalPlayers: number
}



const Card = ({name, description, imageUrl, releaseDate, genre, developer, rating, totalPlayers}: GameEntry) => {
    return (
        <div className="GameInfoCard">
            <div>
                <img src={imageUrl} alt={name} className="CardBanner" />
            </div>
            <div>
                <h2 className="text-xl font-bold text-slate-100 text-center">{name}</h2>
                <p className="text-slate-200 text-center">{description}</p>
                <div className="mt-2">
                    <div className="InfoGrid text-center">
                        <button className="InfoEntry">
                            Release Date: {releaseDate}
                        </button>
                        <button className="InfoEntry">
                            Genre: {genre}
                        </button>
                        <button className="InfoEntry">
                            Developer: {developer}
                        </button>
                        <button className="InfoEntry">
                            Rating: {rating}/10
                        </button>
                        <button className="InfoEntry">
                            Total Players: {totalPlayers}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Game = ({GameData}: {GameData: GameEntry[]}) => {
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