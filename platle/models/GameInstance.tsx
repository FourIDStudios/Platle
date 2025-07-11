import { ObjectId } from "mongodb";


export default class GameInstance {
    constructor(
        public gameInfo: ObjectId,
        public dateCreated: Date,
        public id?: ObjectId
    ) {}
}
