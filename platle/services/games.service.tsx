import GameInfo from "@/models/GameInfo";
import axios from "axios";

export async function fetchGames(){
    const IGDB_API_URL = `${process.env.REACT_APP_BASE_URL}/games`;
    let gameData;
    let queryString = `
        fields name, cover.image_id, first_release_date, genres, rating, player_perspectives, screenshots;
        where name != null & cover != null & first_release_date != null & genres != null & genres.name != null & summary != null & rating != null & id != null & rating > 25 & screenshots != null;
        limit 10;
        offset ${Math.random()*500};
    `
    try{
        const res = await axios.post(
            IGDB_API_URL,
            queryString,
            {
                headers:{
                    "Client-ID": process.env.REACT_APP_CLIENT_ID || "",
                    "Authorization": `Bearer ${process.env.REACT_APP_ACCESS_TOKEN || ""}`,
                    "Accept": "application/json"
                }
            });
        gameData = res.data.map((game: any) => ({
            id: game.id?.toString(),
            name: game.name,
            cover: `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`,
            first_release_date: game.first_release_date
                ? new Date(game.first_release_date * 1000).toISOString().split("T")[0]
                : "",
            genre: Array.isArray(game.genres) ? game.genres.join(",") : "",
            rating: game.rating?.toFixed(0),
        }));
        console.log("Fetched Games: ",gameData)
        //console.log("Raw Data: ",res.data)
        return gameData;
    }catch(error){
        console.error("Error fetching IGDB games:", error);
        return null;
    }
}