import { Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../types/express';

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction){
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if(!token){
        return res.status(401).json({
            success: false,
            message: "Sem autorização!"
        });
    } else {
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET as string) as { storeId: string };
            req.storeId = payload.storeId;
            next();
        } catch {
            return res.status(401).json({ success: false, message: "Token inválido!" });
        }
    }
}
