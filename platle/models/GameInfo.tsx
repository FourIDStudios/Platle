import { ObjectId } from "mongodb";


export default class GameInfo {
    constructor(
        public name: string, 
        public cover: number, 
        public first_release_date: number, 
        public genres: number[], 
        public description: string, 
        public rating: number, 
        public id?: ObjectId
    ) {}
}
