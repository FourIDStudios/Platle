import { randomUUID } from "crypto"

const playtle_data_key = "playtle_user_id"

function getOrCreateUserId(): string {
    let userId = localStorage.getItem(playtle_data_key)
    if(!userId) { 
        userId = randomUUID();
        localStorage.setItem(playtle_data_key, userId)
    }
    return userId;
}