import 'express';

declare module 'express' {
    interface Request {
        storeId?: string;
    }
}
