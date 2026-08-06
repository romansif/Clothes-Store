import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { supabase } from "#lib/supbase.js";

const ACCESS_SECRET = 'your_access_secret_key_123';
const REFRESH_SECRET = 'your_refresh_secret_key_123';

const generateAccessToken = (user) => {
    return jwt.sign({ userId: user.id, email: user.email }, ACCESS_SECRET, { expiresIn: '1h' });
};

const generateRefreshToken = (user) => {
    return jwt.sign({ userId: user.id }, REFRESH_SECRET, { expiresIn: '7d' });
};

export const authController = {
    async register (req, res) {
        try {
            const { role, name, surName, companyName, publicPhone, privatePhone, email, password, dateCreatedAccount, userId } = req.body;

            const { data: candidates, error: candidateError } = await supabase
                .from('users')
                .select('*')
                .eq('email', email)

            if(candidateError) throw candidateError;

            if (candidates && candidates.length >=2 ) {
                return res.status(400).json({ message: `This email is already registered for both Buyer and Seller accounts.`,
                    errors: { email: `Limit reached. You can only have one Buyer and one Seller account per email.` }
                });
            }

            const duplicateRole = candidates?.find(u => u.role === role);
            if(duplicateRole) {
                const roleText = (role === 'Buyer' ? 'Buyer' : 'Seller')
                return res.status(400).json({
                    message: `An account with this email already exists as a ${roleText}.`,
                    errors: { email: `This email is already taken by a ${roleText} account.` }
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = {
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

            const { data: createdUser, error: insertError } = await supabase
                .from('users')
                .insert([newUser])
                .select()
                .single();

            if (insertError) throw insertError;

            const accessToken = generateAccessToken(createdUser);
            const refreshToken = generateRefreshToken(createdUser);

            const updatedTokens = [...(createdUser.refreshTokens || []), refreshToken];
            await supabase
                .from('users')
                .update({refreshTokens: updatedTokens})
                .eq('id', createdUser.id)

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

            const { password: _, refreshTokens: __, ...userWithoutPassword } = createdUser;
            res.status(201).json({ ...userWithoutPassword, accessToken });
        } catch (err) {
            console.error(`Failed to register the new user: ${req.body?.email}`, err)
            res.status(500).json({ message: 'Registration error' });
        }
    },

    async login (req, res) {
        const { email, password, role } = req.body;

        try {
            if (!email || !password || !role) {
                return res.status(400).json({ message: 'Email and password are required.' });
            }
            const { data: user, error: fetchError } = await supabase
                .from('users')
                .select('*')
                .eq('email', email)
                .eq('role', role)
                .single()

            if(fetchError) throw fetchError;

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

            let userRefreshTokens = Array.isArray(user.refreshTokens) ? user.refreshTokens : [];
            userRefreshTokens.push(refreshToken);

            const { error: updateError } = await supabase
                .from('users')
                .update({ refreshTokens: userRefreshTokens })
                .eq('id', user.id);

            if (updateError) throw updateError;

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
            console.error(`Failed to login: ${req.body?.email}`, err)
            res.status(500).json({ message: 'Authorization error' });
        }
    },

    async oAuth (req, res) {
        try {

        } catch (err) {
            console.error(`Failed to login with google: ${user}`, err)
            res.status(500).json({ message: 'Authorization error' });
        }
    },

    async logout (req, res) {
        const refreshToken = req.cookies.refreshToken;

        if(refreshToken){
            try{
                const { data: user } = await supabase
                    .from('users')
                    .select('id', refreshTokens)
                    .contains('refreshTokens', [refreshToken])
                if(user && user.refreshTokens){
                    const newTokens = user.refreshTokens.filter(t => t !== refreshToken);
                    await supabase
                        .from('users')
                        .update({refreshTokens: newTokens})
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

        try {
            const decoded = jwt.verify(refreshToken, REFRESH_SECRET);

            const { data: user, error } = await supabase
                .from('users')
                .select('*')
                .eq('id', decoded.userId)
                .single();

            if (error || !user || !user.refreshTokens || !user.refreshTokens.includes(refreshToken)) {
                return res.status(403).json({ message: 'Токен недействителен или отозван' });
            }

            const newAccessToken = generateAccessToken(user);
            const newRefreshToken = generateRefreshToken(user);

            const updatedTokens = user.refreshTokens.filter(t => t !== refreshToken);
            updatedTokens.push(newRefreshToken);

            await supabase
                .from('users')
                .update({ refreshTokens: updatedTokens })
                .eq('id', user.id);

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
            console.error(`Failed to refresh: ${    user}`, err)
            return res.status(403).json({ message: 'Refresh token expired' });
        }
    }
}