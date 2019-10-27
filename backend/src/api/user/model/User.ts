import { Document } from "mongoose";

export interface IUser extends Document {
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
