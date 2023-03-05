import jwt from 'jsonwebtoken';

interface AuthData {
    token: string
}

export function getAuthDataFrom(data: { _id: string }): AuthData {
    const token = jwt.sign(data, process.env.JWT_SECRET!);
    return { token };
}

export function getUserFrom(data: AuthData) {
    const decoded = jwt.decode(data.token);
    return decoded as { _id: string };
}
