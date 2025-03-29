import { Request, Response } from 'express';

declare module 'express-serve-static-core' {
    interface Request {
        user?: { 
            id: string,
             role: 'user' | 'client' | 'admin'
            } 
        cookies: {refreshToken?: string}
        query: {page?: number}
    }
    // interface Response {
    //     status?: { id: string} 
    // }
}