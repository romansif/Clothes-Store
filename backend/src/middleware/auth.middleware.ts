import jwt from "jsonwebtoken";
import { type Request, type Response, type NextFunction, type RequestHandler } from "express";
import { type CustomJwtPayload, type AuthenticatedRequest } from "../interfaces.ts";
import { ACCESS_SECRET } from "#config/auth.config";

const extractToken = (req: Request): string | null => {
    const cookie = req.cookies?.accessToken;
    if (typeof cookie === "string" && cookie) return cookie;

    const header = req.headers.authorization;
    if (typeof header === "string" && header.startsWith("Bearer ")) {
        return header.slice(7).trim() || null;
    }
    return null;
};

export const authMiddleware: RequestHandler = (req, res, next) => {
    const authReq = req as AuthenticatedRequest;
    const token = extractToken(req);

    if (!token) {
        return res.status(401).json({ message: "Access denied. Token not provided." });
    }

    try {
        const decoded = jwt.verify(token, ACCESS_SECRET, { algorithms: ["HS256"] }) as CustomJwtPayload;

        if (!decoded || typeof decoded !== "object" || !(decoded as { userId?: unknown }).userId) {
            return res.status(401).json({ message: "Your session has expired; please log in again." });
        }

        authReq.user = decoded;
        return next();
    } catch (err) {
        console.warn("Auth rejected:", err instanceof Error ? err.name : "unknown error");
        return res.status(401).json({ message: "Your session has expired; please log in again." });
    }
};

export const roleMiddleware = (requiredRole: string) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        if (!req.user || req.user.role !== requiredRole) {
            return res.status(403).json({ message: "Access is forbidden for this role." });
        }
        return next();
    };
};