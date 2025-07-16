import axios from "axios";

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

export async function fetchGames(){
    console.log("[O]: Fetching Access Token... ")
    const Access_token = 'f6dmznanwy7dbcaq17j2c1szv3dm4c';

    const IGDB_API_URL = `${process.env.IGDB_API_URL}/games`;
    let gameData;
    let queryString = `
        fields name, cover.image_id, first_release_date, genres, rating, player_perspectives, screenshots;
        where name != null & cover != null & first_release_date != null & genres != null & genres.name != null & summary != null & rating != null & id != null & rating > 25 & screenshots != null;
        limit 500;
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
            genre: Array.isArray(game.genres) ? game.genres.join(",") : "",
            rating: game.rating?.toFixed(0),
        }));
        console.log("[0]: Fetched Games: ",gameData)
        //console.log("Raw Data: ",res.data)
        return gameData;
    }catch(error){
        console.error("[X]: Error fetching IGDB games:", error);
        return null;
    }
}