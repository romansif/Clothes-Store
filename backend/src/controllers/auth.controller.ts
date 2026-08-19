import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { v4 as uuid4 } from 'uuid';
import { dbService } from '../db/db.config.ts';
import { OAuth2Client } from "google-auth-library";
import { type Request, type Response } from "express";
import { type User, type JwtCustomPayload, type TokenPayload } from '../interfaces.ts';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const ACCESS_SECRET = 'your_access_secret_key_123';
const REFRESH_SECRET = 'your_refresh_secret_key_123';

const generateAccessToken = (user: Pick<User, any>) => {
    return jwt.sign({ userId: user.id, email: user.email }, ACCESS_SECRET, { expiresIn: '1h' });
};

const generateRefreshToken = (user: Pick<User, any>) => {
    return jwt.sign({ userId: user.id }, REFRESH_SECRET, { expiresIn: '7d' });
};

const authController = {
    async register (req: Request, res: Response) {
        try {
            const { role, name, surName, companyName, publicPhone, privatePhone, email, password, created_at, userId } = req.body;

            const db = dbService.readDB();
            const users: any[] = db.users || [];

            const candidates = users.filter(u => u.email === email);

            if (candidates && candidates.length >= 2) {
                return res.status(400).json({
                    message: `This email is already registered for both Buyer and Seller accounts.`,
                    errors: { email: `Limit reached. You can only have one Buyer and one Seller account per email.` }
                });
            }

            const duplicateRole = candidates?.find(u => u.role === role);
            if (duplicateRole) {
                const roleText = (role === 'Buyer' ? 'Buyer' : 'Seller');
                return res.status(400).json({
                    message: `An account with this email already exists as a ${roleText}.`,
                    errors: { email: `This email is already taken by a ${roleText} account.` }
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = {
                id: uuid4,
                role,
                name,
                surName,
                privatePhone,
                companyName,
                publicPhone,
                email,
                password: hashedPassword,
                avatarUrl: 'uploads/avatars/default-avatar.png',
                created_at: created_at || new Date().toISOString(),
                refreshTokens: [],
                userId
            };

            users.push(newUser);
            db.users = users;
            dbService.writeDB(db);

            const accessToken = generateAccessToken(newUser);
            const refreshToken = generateRefreshToken(newUser);

            // @ts-ignore
            newUser.refreshTokens.push(refreshToken);
            dbService.writeDB(db);

            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                sameSite: 'lax',
                secure: false,
                maxAge: 60 * 60 * 1000
            });

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: false,
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            const { password: _, refreshTokens: __, ...userWithoutPassword } = newUser;
            res.status(201).json({ ...userWithoutPassword, accessToken });
        } catch (err) {
            console.error(`Failed to register the new user: ${req.body?.email}`, err);
            res.status(500).json({ message: 'Registration error' });
        }
    },

    async login (req: Request, res: Response) {
        const { email, password, role } = req.body;

        try {
            if (!email || !password || !role) {
                return res.status(400).json({ message: 'Email, password and role are required.' });
            }

            const db = dbService.readDB();
            const users: any[] = db.users || [];

            const user = users.find(u => u.email === email && u.role === role);

            if (!user) {
                return res.status(400).json({
                    message: 'Invalid email or password',
                    errors: { email: 'Invalid email or password' }
                });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({
                    message: 'Invalid email or password',
                    errors: { password: 'Invalid password' }
                });
            }

            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);

            if (!Array.isArray(user.refreshTokens)) {
                user.refreshTokens = [];
            }
            user.refreshTokens.push(refreshToken);
            dbService.writeDB(db);

            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                sameSite: 'lax',
                secure: false,
                maxAge: 60 * 60 * 1000
            });

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: false,
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            const { password: _, refreshTokens: __, ...userWithoutPassword } = user;

            return res.json({ ...userWithoutPassword, accessToken });
        } catch (err) {
            console.error(`Failed to login: ${req.body?.email}`, err);
            res.status(500).json({ message: 'Authorization error' });
        }
    },

    async google(req: Request, res: Response) {
        try {
            const { credential, userId, role, created_at } = req.body;

            if (!credential) {
                return res.status(400).json({ message: "Google credential is required" });
            }

            const ticket = await client.verifyIdToken({
                idToken: credential,
                audience: process.env.GOOGLE_CLIENT_ID,
            });

            const payload = ticket.getPayload() as TokenPayload;

            if (!payload) {
                return res.status(400).json({ message: 'Invalid Google token payload' });
            }

            const { sub, email, given_name, family_name, name, phone, picture, email_verified } = payload;

            if (!email_verified) {
                return res.status(401).json({ message: "Email is not verified" });
            }

            const db = dbService.readDB();
            const users: any[] = db.users || [];

            let user = users.find(u => u.email === email);

            if (!user) {
                const email: string = payload.email || '';

                const userGivenName = given_name || name || email.split('@')[0];
                const userSurName = family_name || "";
                const privatePhone = phone || "";

                user = {
                    id: uuid4,
                    email,
                    role: role || 'Buyer',
                    name: userGivenName,
                    surName: userSurName,
                    avatarUrl: picture || '',
                    privatePhone,
                    googleId: sub,
                    created_at: created_at || new Date().toISOString(),
                    password: '',
                    userId,
                    refreshTokens: []
                };

                users.push(user);
            }

            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);

            if (!Array.isArray(user.refreshTokens)) {
                user.refreshTokens = [];
            }
            user.refreshTokens.push(refreshToken);
            user.googleId = user.googleId || sub;

            dbService.writeDB(db);

            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                sameSite: 'lax',
                secure: false,
                maxAge: 60 * 60 * 1000
            });

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: false,
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            const { password, refreshTokens, ...userWithoutPassword } = user;

            return res.json({ ...userWithoutPassword, accessToken });

        } catch (err) {
            console.error("Failed to login with Google:", err);
            return res.status(500).json({ message: "Authorization error" });
        }
    },

    async sendSmsCode (_req: Request, res: Response) {
        return res.status(501).json({ message: 'SMS sending is not supported in local file mode' });
    },

    async verifySmsCode(_req: Request, res: Response) {
        return res.status(501).json({ message: 'SMS verification is not supported in local file mode' });
    },

    async logout (req: Request, res: Response) {
        const refreshToken = req.cookies.refreshToken;

        if (refreshToken) {
            try {
                const db = dbService.readDB();
                const users: any[] = db.users || [];

                const user = users.find(u => Array.isArray(u.refreshTokens) && u.refreshTokens.includes(refreshToken));

                if (user) {
                    user.refreshTokens = user.refreshTokens.filter((t: string) => t !== refreshToken);
                    dbService.writeDB(db);
                }
            } catch (err) {
                console.log(`Failed to logout`, err);
            }
        }
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken', { path: '/' });

        return res.json({ success: true, message: 'Successfully logged out of the system' });
    },

    async refresh (req: Request, res: Response) {
        const refreshToken = req.cookies.refreshToken;

        try {
            if (!refreshToken) {
                return res.status(403).json({ message: 'Refresh token missing' });
            }

            const decoded = jwt.verify(refreshToken, REFRESH_SECRET) as JwtCustomPayload;

            const db = dbService.readDB();
            const users: any[] = db.users || [];

            const user = users.find(u => u.id === decoded.userId);

            if (!user || !Array.isArray(user.refreshTokens) || !user.refreshTokens.includes(refreshToken)) {
                return res.status(403).json({ message: 'Токен недействителен или отозван' });
            }

            const newAccessToken = generateAccessToken(user);
            const newRefreshToken = generateRefreshToken(user);

            user.refreshTokens = user.refreshTokens.filter((t: string) => t !== refreshToken);
            user.refreshTokens.push(newRefreshToken);

            dbService.writeDB(db);

            res.cookie('accessToken', newAccessToken, {
                httpOnly: true,
                sameSite: 'lax',
                secure: false,
                maxAge: 15 * 60 * 1000
            });

            res.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: false,
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            res.json({ success: true });
        } catch (err) {
            console.error(`Failed to refresh:`, err);
            return res.status(403).json({ message: 'Refresh token expired' });
        }
    }
};

export default authController;