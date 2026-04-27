import { Request, Response } from 'express';

function check(req: Request, res: Response){
    res.status(200).json({
        "status": "ok",
        "timestamp": new Date()
    });
}

export { check };