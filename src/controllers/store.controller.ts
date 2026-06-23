import * as StoreService from "../services/store.service";
import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../types/express";

export async function createStore(req: Request, res: Response, next: NextFunction){
    try {
        const { name, email, password } = req.body;

        const { password: _,...storeCreated} =  await StoreService.createStore(name, email, password);
        
        res.status(201).json({
            "success": true, 
            "data": storeCreated 
        });
    } catch (error) {
        next(error);
    }
}

export async function getAllStores(req: Request, res: Response, next: NextFunction) {
    try {
        const allStores = await StoreService.getAllStores();

        const stores = allStores.map(({password, ...store}) => store)

        res.status(200).json({
            "success": true, 
            "data": stores
        });
    } catch (error) {
        next(error);
    }
}

export async function getStoreById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const id = req.storeId as string

        const {password: _, ...store } = await StoreService.getStoreById(id);

        res.status(200).json({
            "success": true, 
            "data": store
        });
    } catch (error) {
        next(error);
    }
}

export async function updateStore(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const { name, email, password } = req.body;
        const id = req.storeId as string

        const {password: _,...updatedStore} = await StoreService.updateStore(id, name, email, password);

        res.status(200).json({
            "success": true, 
            "data": updatedStore
        });
    } catch (error) {
        next(error);
    }
}

export async function deleteStore(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const id = req.storeId as string

        await StoreService.deleteStore(id);

        res.status(204).send();
    } catch (error) {
        next(error);
    }
}