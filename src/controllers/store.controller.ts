import * as StoreService from "../services/store.service";
import { Request, Response } from "express";

export async function createStore(req: Request, res: Response){
    const { name, email, password } = req.body;

    const storeCreated =  await StoreService.createStore(name, email, password);
    
    res.status(201).json({
        "success": true, 
        "data": storeCreated 
    });
}

export async function getAllStores(req: Request, res: Response) {
    const allStores = await StoreService.getAllStores();

    res.status(200).json({
        "success": true, 
        "data": allStores
    });
}

export async function getStoreById(req: Request, res: Response) {
    const id = req.params.id as string;

    const store = await StoreService.getStoreById(id);

    res.status(200).json({
        "success": true, 
        "data": store
    });
}

export async function updateStore(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const id = req.params.id as string;

    const updatedStore = await StoreService.updateStore(id, name, email, password);

    res.status(200).json({
        "success": true, 
        "data": updatedStore
    });
}

export async function deleteStore(req: Request, res: Response) {
    const id = req.params.id as string;

    const deletedStore = await StoreService.deleteStore(id);

    res.status(200).json({
        "success": true, 
        "data": deletedStore
    });
}