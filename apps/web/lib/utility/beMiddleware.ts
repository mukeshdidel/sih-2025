import { jwtVerify } from 'jose';

export interface AuthenticatedUser {
    id: string;
    email: string;
    userType: 'doctor' | 'patient';
    name: string;
    iat: number;
}

export async function getAuthenticatedUser(req: Request): Promise<AuthenticatedUser | null> {
    try {
        const authHeader = req.headers.get('authorization');
        if (!authHeader) return null;
        const words = authHeader.split(" ");
        const jwtToken = words[1];
        if (!jwtToken) return null;

        const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET!);
        const { payload } = await jwtVerify(jwtToken, SECRET_KEY);
        return payload as unknown as AuthenticatedUser; // <-- Fix here
    } catch {
        return null;
    }
}
