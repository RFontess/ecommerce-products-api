import * as AuthService from '../services/auth.service';
import { NextFunction, Request, Response } from "express";

export async function register(req: Request, res: Response, next: NextFunction) {
    try {
        const { name, email, password } = req.body;
        
        const data = await AuthService.register(name, email, password);
        
        res.status(201).json({
            "success": true, 
            "data":  data
        }); 
    } catch (error) {
        next(error);
    }
}

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password } = req.body;

        const token = await AuthService.login(email, password);

        res.status(200).json({
            "success": true, 
            "data":  token
        }); 
    } catch (error) {
        next(error);
    }
}