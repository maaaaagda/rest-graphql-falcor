import { Document } from "mongoose";
import { Entity } from "../../../core/database/Entity";

export interface IUser extends Document, Entity {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    verification: string;
    verified: boolean;
    phone: string;
    city: string;
    country: string;
    urlTwitter: string;
    urlGitHub: string;
    loginAttempts: number;
    blockExpires: string;
}
