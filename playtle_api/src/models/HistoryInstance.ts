import { ObjectId } from "mongodb";


export default class HistoryInstance {
    constructor(
        public gameId: string,
        public dateCreated: string,
        public id?: ObjectId
    ) {}
}
