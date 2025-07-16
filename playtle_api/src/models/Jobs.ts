import { ObjectId } from "mongodb";


export default class Job {
    constructor(
        public name: string, 
        public lastRun: Date, 
        public type: string,
        public intervalDays: number, 
        public isActive: boolean, 
        public id?: ObjectId
    ) {}
}