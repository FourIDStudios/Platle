import { ObjectId } from "mongodb";


export default class GameInfo {
    constructor(
        public name: string, 
        public cover: string, 
        public first_release_date: number, 
        public platforms : number[],
        public genres: number[],
        public involved_companies: number[],
        public total_rating: number, 
        public isIndie: boolean,
        public id?: ObjectId
    ) {}
}


/*
Query Details

game_status === 0 (Released)
game_type === 0 (A main game (not a mod/etc))
cover.image_id [image url parsed] != null 
first_release_date [Unix Time Stamp] != null
platforms [number] != null
genres [number] != null
involved_companies [number] != null
total_rating  [number] != null
*/