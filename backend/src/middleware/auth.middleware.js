import jwt from "jsonwebtoken";

const ACCESS_SECRET = 'your_access_secret_key_123'

export const authMiddleware = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) {
        return res.status(401).json({ message: 'Access denied. Token not provided.' });
    }
    try {
        const decoded = jwt.verify(token, ACCESS_SECRET);
        req.user = decoded;
        next();
    } catch (e) {
        return res.status(401).json({ message: 'Your session has expired; please log in again.' });
    }
};

export const roleMiddleware = (role) => {
    return(req, res, next) => {
        if(!req.user || req.user.role !== role){
            return res.status(403).json({ message: `Access is permitted only for the role ${role}.` });
        }
    }
}