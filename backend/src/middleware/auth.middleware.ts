import jwt from "jsonwebtoken";
import { type Response, type NextFunction, type RequestHandler } from "express";
import { type CustomJwtPayload, type AuthenticatedRequest } from "../interfaces.ts";

const ACCESS_SECRET = 'your_access_secret_key_123'

export const authMiddleware: RequestHandler = (req, res, next) => {
    const authReq = req as AuthenticatedRequest;
    const token = req.cookies?.accessToken;
    if (!token) {
        return res.status(401).json({ message: 'Access denied. Token not provided.' });
    }
    try {
        const decoded = jwt.verify(token, ACCESS_SECRET) as CustomJwtPayload;
        authReq.user = decoded;
        return next();
    } catch (err) {
        console.log(`It is not possible to do this without authorization.: `, err)
        return res.status(401).json({ message: 'Your session has expired; please log in again.' });
    }
};

export const roleMiddleware = (requireRole: string) => {
    return(req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        if(!req.user || req.user?.role !== requireRole){
            return res.status(403).json({ message: `Access is permitted only for the role.` });
        }
        return next()
    }
}