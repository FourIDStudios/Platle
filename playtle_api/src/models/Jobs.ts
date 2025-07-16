import { ObjectId } from "mongodb";
import mongoose from 'mongodb';


export default class DbUpdateJob {
    constructor(
        public name: string, 
        public lastRun: Date, 
        public intervalDays: number, 
        public isActive: boolean, 
        public id?: ObjectId
    ) {}
}