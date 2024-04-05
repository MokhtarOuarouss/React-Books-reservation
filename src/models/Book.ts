import { User } from "./User";

export interface Book {
    id?: number;
    owner : User | undefined;
    title: string ;
    resume: string ;
    genre: string ;
    price: number ;
}