import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError } from "../errors/app-error";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

export function errorMiddleware(err: unknown, req: Request, res: Response, next: NextFunction) {

    if (err instanceof ZodError) {
        return res.status(400).json({
            success: false,
            message: "Dados inválidos", 
            fields: err.issues
        });
    }

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    }

    if (err instanceof PrismaClientKnownRequestError) {
        if(err.code === "P2002"){
            return res.status(409).json({
                success: false,
                message: "Registro já existente!"
            });
        }
        if(err.code === "P2003"){
            return res.status(400).json({
                success: false,
                message: "A loja ou categoria informada não existe."
            });        
        }
        if(err.code === "P2025"){
            return res.status(404).json({
                success: false,
                message: "Registro não encontrado."
            });        
        }

        return res.status(400).json({
            success: false,
            message: `Database Error: [${err.code}.]`
        });
    
    }

    return res.status(500).json({ 
        success: false, 
        message: "Erro interno do Servidor"
    });
}