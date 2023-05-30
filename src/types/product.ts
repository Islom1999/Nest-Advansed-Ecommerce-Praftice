import { Document } from "mongoose";
import { User } from "./user";

export interface Product extends Document {
    title: string;
    descr: string;
    image: string;
    price: string;
    amount: number;
    owner: User
}