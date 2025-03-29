import { Request, Response } from 'express';

declare module 'express-serve-static-core' {
    interface Request {
        user?: { id: string, role: 'user' | 'client' | 'admin'}
        client?: { id: string} 
        cookies?: {refreshToken: string}
    }
    // interface Response {
    //     status?: { id: string} 
    // }
}