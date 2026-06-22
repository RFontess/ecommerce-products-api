import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

export function authMiddleware(req: Request, res: Response, next: NextFunction){
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];
    
    if(!token){
        res.status(401).json({
            success: false,
            message: "Sem autorização!"
        });
    } else {
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET as string) as { storeId: string}
            req.storeId = payload.storeId
            next();
        } catch {
            res.status(401).json({ success: false, message: "Token inválido!"})
        }
    }
}