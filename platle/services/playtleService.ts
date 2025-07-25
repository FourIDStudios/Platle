import UserData from "@/models/UserData";
import axios from "axios";



//#region  User data

export async function fetchUser(userId:string){
    const userEndpoint = `http://localhost:4000/users/${userId}`;

    try{
        const res = await axios.get(userEndpoint,{
            headers:{
              "Access-Control-Allow-Origin": true,
            },
        });
        const userData:UserData = res.data
        
        console.log("[O]: Fetched UserData:", userData);
        return userData;
    }catch(error){
        console.error("[X]: Error fetching UserData:", error);
        return null;
    }
}

//#endregion