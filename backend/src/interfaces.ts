import { type Request } from "express";
import { type JwtPayload } from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
    user?: CustomJwtPayload
    file?: Express.Multer.File;
}

export interface CustomJwtPayload extends JwtPayload {
    userId: string;
    id?: string;
    email?: string;
    role?: string;
}

export interface User {
    id: string,
    role: string,
    name: string,
    surName: string,
    companyName: string,
    privatePhone: string,
    publicPhone: string,
    email: string,
    password: string,
    avatarUrl: string,
    refreshToken: string[],
    userId: null,
    googleId: string,
    created_at: string
}

export interface TokenPayload {
    sub: string,
    email?: string,
    given_name?: string,
    family_name?: string,
    name?: string,
    phone?: string,
    picture?: string,
    email_verified?: string,
}

export interface JwtCustomPayload {
    userId: string;
    email?: string;
}
