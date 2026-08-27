export interface User {
    id: string,
    role: string,
    name: string,
    surName: string,
    phone: string,
    email: string,
    password: string,
    avatarUrl: string,
    created_at: string,
    refreshTokens: object,
    userId: string
}

export interface UserDataUpdate {
    name?: string;
    surName?: string;
    phone?: string;
    email?: string;
}