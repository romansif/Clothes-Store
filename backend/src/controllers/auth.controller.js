import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcryptjs'
import { dbService } from "../config/db.service.js";

const ACCESS_SECRET = 'your_access_secret_key_123'
const REFRESH_SECRET = 'your_refresh_secret_key_123'

const generateAccessToken = (user) => {
    return jwt.sign({ userId: user.id, email: user.email }, ACCESS_SECRET, { expiresIn: '15m' });
}

const generateRefreshToken = (user) => {
    return jwt.sign({ userId: user.id }, REFRESH_SECRET, { expiresIn: '7d' });
}

export const authController = {
    async register (req, res) {
        try {
            const db = dbService.readDB()
            const { role, name, surName, companyName, publicPhone, privatePhone, email, password, dateCreatedAccount, userId } = req.body;

            const candidate = db.users.filter(u => u.email === email);
            if (candidate.length >= 2) {
                return res.status(400).json({ message: `This email is already registered for both Buyer and Seller accounts.`,
                    errors: { email: `Limit reached. You can only have one Buyer and one Seller account per email.` }
                });
            }

            const duplicateRole = candidate.find(u => u.role === role);
            if(duplicateRole) {
                const roleText = (role === 'Buyer' ? 'Buyer' : 'Seller')
                return res.status(400).json({
                    message: `An account with this email already exists as a ${roleText}.`,
                    errors: { email: `This email is already taken by a ${roleText} account.` }
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = {
                id: uuidv4(),
                role,
                name,
                surName,
                privatePhone,
                companyName,
                publicPhone,
                email,
                password: hashedPassword,
                avatarUrl: 'uploads/avatars/default-avatar.png',
                dateCreatedAccount,
                refreshTokens: [],
                userId
            };

            const accessToken = generateAccessToken(newUser);
            const refreshToken = generateRefreshToken(newUser);

            newUser.refreshTokens.push(refreshToken);

            db.users.push(newUser);
            dbService.writeDB(db);

            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                sameSite: 'lax',
                secure: false,
                maxAge: 15 * 60 * 1000
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
            console.log(`Failed to register the new user: ${newUser}`, err)
            res.status(500).json({ message: 'Registration error' });
        }
    },

    async login (req, res) {
        const db = dbService.readDB();
        const { email, password, role } = req.body;

        try {
            if (!email || !password || !role) {
                return res.status(400).json({ message: 'Email and password are required.' });
            }
            const user = db.users.find(u => u.email === email && u.role === role);

            if(!user) {
                return res.status(400).json({
                    message: 'Invalid email or password',
                    errors: { email: 'Invalid email or password' }
                });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if(!isPasswordValid){
                return res.status(400).json({
                    message: 'Invalid email or password',
                    errors: { password: 'Invalid password' }
                });
            }

            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);

            if (!user.refreshTokens) user.refreshTokens = [];
            user.refreshTokens.push(refreshToken);
            dbService.writeDB(db);

            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                sameSite: 'lax',
                secure: false,
                maxAge: 15 * 60 * 1000
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
            console.log(`Failed to login: ${user}`, err)
            res.status(500).json({ message: 'Authorization error' });
        }
    },

    async oAuth (req, res) {
        try {

        } catch (err) {
            console.log(`Failed to login with google: ${user}`, err)
            res.status(500).json({ message: 'Authorization error' });
        }
    },

    async logout (req, res) {
        const refreshToken = req.cookies.refreshToken;

        if(refreshToken){
            try{
                const db = dbService.readDB()
                const user = db.users.find(u => u.refreshTokens && u.refreshTokens.includes(refreshToken));
                if(user){
                    user.refreshTokens = user.refreshTokens.filter(t => t !== refreshToken);
                    dbService.writeDB(db);
                }
            }catch(err){
                console.log(`Failed to logout: ${user}`, err)
            }
        }
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken', { path: '/' });

        return res.json({ success: true, message: 'Successfully logged out of the system' });
    },

    async refresh (req, res) {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(401).json({ message: 'No refresh token' });

        try {
            const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
            const db = dbService.readDB();

            const user = db.users.find(u => u.id === decoded.userId);
            if (!user || !user.refreshTokens || !user.refreshTokens.includes(refreshToken)) {
                return res.status(403).json({ message: 'Токен недействителен или отозван' });
            }

            const newAccessToken = generateAccessToken(user);
            const newRefreshToken = generateRefreshToken(user);

            user.refreshTokens = user.refreshTokens.filter(t => t !== refreshToken);
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
            console.log(`Failed to refresh: ${user}`, err)
            return res.status(403).json({ message: 'Refresh token expired' });
        }
    }
}