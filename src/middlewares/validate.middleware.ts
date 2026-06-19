import { Request, Response, NextFunction } from 'express';
import { z, ZodSchema } from 'zod'

const validate = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = schema.parse(req.body);
            next();
        } catch (error) {
            next(error);
        }
    }
}

export { validate };