import { ObjectId } from "mongodb";


export default class GameInfo {
    constructor(
        public name: string, 
        public cover: string, 
        public first_release_date: number, 
        public genres: string[], 
        public rating: number, 
        public id?: ObjectId
    ) {}
}
