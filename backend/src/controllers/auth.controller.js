import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { supabase } from "#lib/supbase.js";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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
                maxAge: 60 * 60 * 1000
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
            console.error(`Failed to login: ${req.body?.email}`, err)
            res.status(500).json({ message: 'Authorization error' });
        }
    },

    async google(req, res) {
        try {
            const { credential, userId, role, dateCreatedAccount } = req.body;

            if (!credential) {
                return res.status(400).json({
                    message: "Google credential is required"
                });
            }

            const ticket = await client.verifyIdToken({
                idToken: credential,
                audience: process.env.GOOGLE_CLIENT_ID,
            });

            const payload = ticket.getPayload();

            const {
                sub,
                email,
                given_name,
                family_name,
                name,
                phone,
                picture,
                email_verified
            } = payload;

            if (!email_verified) {
                return res.status(401).json({
                    message: "Email is not verified"
                });
            }

            let { data: user, error } = await supabase
                .from("users")
                .select("*")
                .eq("email", email)
                .single();

            if (error && error.code !== "PGRST116") {
                throw error;
            }

            if (!user) {
                const userGivenName = given_name || name || email.split('@')[0];
                const userSurName = family_name || "";
                const privatePhone = phone || "";

                const tempUserPayload = { email };
                const initialRefreshToken = generateRefreshToken(tempUserPayload);

                const { data: createdUser, error: insertError } = await supabase
                    .from("users")
                    .insert([{
                        email,
                        role,
                        name: userGivenName,
                        surName: userSurName,
                        avatarUrl: picture || '',
                        privatePhone: privatePhone,
                        googleId: sub,
                        dateCreatedAccount,
                        password: '',
                        userId,
                        refreshTokens: [initialRefreshToken]
                    }])
                    .select()
                    .single();

                if (insertError) throw insertError;

                user = createdUser;
            }else{
                const refreshToken = generateRefreshToken(user);
                const tokens = [...(user.refreshTokens || []), refreshToken];

                const { error: updateError } = await supabase
                    .from("users")
                    .update({
                        googleId: user.googleId || sub,
                        refreshTokens: tokens
                    })
                    .eq("id", user.id);

                if (updateError) throw updateError;

                user.refreshTokens = tokens;
            }

            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);

            const tokens = [...(user.refreshTokens || []), refreshToken];

            await supabase
                .from("users")
                .update({
                    refreshTokens: tokens
                })
                .eq("id", user.id);

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

            const {password, refreshTokens, ...userWithoutPassword} = user;

            return res.json({...userWithoutPassword, accessToken});

        }catch (err) {
            console.error("Failed to login with Google:", err);
            return res.status(500).json({message: "Authorization error"});
        }
    },

    async logout (req, res) {
        const refreshToken = req.cookies.refreshToken;

        if(refreshToken){
            try{
                const { data: user } = await supabase
                    .from('users')
                    .select('id', req.body.userId)
                    .contains('refreshTokens', [refreshToken])
                if(user && user.refreshTokens){
                    const newTokens = user.refreshTokens.filter(t => t !== refreshToken);
                    await supabase
                        .from('users')
                        .update({refreshTokens: newTokens})
                }
            }catch(err){
                console.log(`Failed to logout: ${req.body?.userId}`, err)
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