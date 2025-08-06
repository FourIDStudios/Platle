import axios from "axios";
import GameInfo from "../models/GameInfo";
import { GameCategoryEnum } from "igdb-api-types";

async function fetchAccessToken(): Promise<string | null> {
    try {
        const res = await axios.post('https://id.twitch.tv/oauth2/token', null, {
            params: {
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_AUTH,
                grant_type: 'client_credentials'
            }
        });
        console.log("[O]: Access Token Fetched!")
        return res.data.access_token;
    } catch (err) {
        console.error("[X]: Failed to fetch access token:", err);
        return null;
    }
}

//Fetch From popularity API
/*

fields name, cover.image_id, first_release_date, genres, involved_companies, platforms, total_rating;
where name != nill & cover!= null & first_release_date != null & genres != null & involved_companies != null & platforms != null & total_rating > 0;
limit 500;

OLD
fields name, cover.image_id, first_release_date, genres, rating, player_perspectives, screenshots;
where name != null & cover != null & first_release_date != null & genres != null & genres.name != null & summary != null & rating != null & id != null & rating > 25 & screenshots != null;
limit 500;
*/

async function fetchGamesOffset(offset:number): Promise<GameInfo[] | null> {
    console.log("[O]: Fetching Access Token... ")
    const Access_token = 'f6dmznanwy7dbcaq17j2c1szv3dm4c';

    const IGDB_API_URL = `${process.env.IGDB_API_URL}/games`;
    
    let gameData;

    
    let queryString = `
        fields name, cover.image_id, first_release_date, genres, involved_companies, platforms, rating, game_type, total_rating_count, total_rating;
        where name != null & cover!= null & first_release_date != null & genres != null & involved_companies != null & platforms != null & rating > 0 & total_rating_count != null & total_rating_count > 10 & game_type = 0;
        limit 500; offset ${offset};
    `
    try{
        const res = await axios.post(
            IGDB_API_URL,
            queryString,
            {
                headers:{
                    "Client-ID": process.env.CLIENT_ID || "",
                    "Authorization": `Bearer ${Access_token}`,
                    "Accept": "application/json",
                    "Content-Type": "text/plain"
                }
            });
        gameData = res.data.map((game: any) => ({
            id: game.id?.toString(),
            name: game.name,
            cover: `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`,
            first_release_date: game.first_release_date
                ? new Date(game.first_release_date * 1000).toISOString().split("T")[0]
                : "",
            platforms: game.platforms,
            genres: game.genres,
            involved_companies: game.involved_companies,
            isIndie: game.genres?.includes(32),
            total_rating: game.rating?.toFixed(0),
        }));
        //console.log("[0]: Fetched Games: ",gameData)
        //console.log("Raw Data: ",res.data)
        return gameData;
    }catch(error){
        console.error("[X]: Error fetching IGDB games:", error);
        return null;
    }
}

export async function fetchGames(){
    const games = [];
    let offset = 0;
    let hasMore = true;
    let totalAllowedFetches = 5;

    while(hasMore && totalAllowedFetches > 0){
        const fetchedGames = await fetchGamesOffset(offset);
        if(fetchedGames && fetchedGames.length > 0){
            games.push(...fetchedGames);
            totalAllowedFetches--;
            offset += fetchedGames.length;
            console.log(`[O]: Fetched ${fetchedGames.length} games, Total: ${games.length}, Offset: ${offset}`);
        }else{
            hasMore = false;
        }
    }
    console.log("[O]: Fetched Total Games: ", games.length);

    return games;
}

