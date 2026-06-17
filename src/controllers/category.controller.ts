import * as CategoryService from "../services/category.service";
import { NextFunction, Request, Response } from "express";

export async function createCategory(req: Request, res: Response, next: NextFunction) {
    try {
        const { name } = req.body;
        const storeId = req.params.storeId as string;

        const categoryCreated = await CategoryService.createCategory(name, storeId);

        res.status(201).json({
            "success": true, 
            "data":  categoryCreated
        }); 
    } catch (error) {
        next(error);
    }
}

export async function getAllCategories(req: Request, res: Response, next: NextFunction) {
    try {
        const storeId = req.params.storeId as string;

        const allCategories = await CategoryService.getAllCategories(storeId);

        res.status(200).json({
            "success": true, 
            "data":  allCategories
        });       
    } catch (error) {
        next(error);
    }
}

export async function getCategoryById(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params.id as string;
        const storeId = req.params.storeId as string;

        const category = await CategoryService.getCategoryById(id, storeId);

        res.status(200).json({
            "success": true, 
            "data":  category
        });  
    } catch (error) {
        next(error);
    }
}

export async function updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
        const { name } = req.body;
        const id = req.params.id as string;
        const storeId = req.params.storeId as string;

        const updatedCategory = await CategoryService.updateCategory(id, storeId, name);
        
        res.status(200).json({
            "success": true, 
            "data":  updatedCategory
        });    
    } catch (error) {
        next(error);
    }
}

export async function deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params.id as string;
        const storeId = req.params.storeId as string;

        await CategoryService.deleteCategory(id, storeId);

        res.status(204).send();
    } catch (error) {
        next(error);
    }
}