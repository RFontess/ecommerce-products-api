import * as ProductService from "../services/product.service";
import { NextFunction, Response } from "express";
import { AuthRequest } from "../types/express";
import { productQuerySchema } from "../schemas/product.schema";

export async function createProduct(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const { sku, name, price, stock, description, costPrice, categoryId } = req.body;
        const storeId = req.storeId ?? req.params.storeId as string;

        const productCreated = await ProductService.createProduct(sku, name, price, stock, storeId, description, costPrice, categoryId);
        
        res.status(201).json({
            "success": true, 
            "data":  productCreated
        });
    } catch (error) {
        next(error);
    }
}

export async function getAllProducts(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const storeId = req.storeId ?? req.params.storeId as string;
        const query = productQuerySchema.parse(req.query);

        const result = await ProductService.findAllProducts(
            storeId,
            query.categoryId,
            query.minPrice,
            query.maxPrice,
            query.name,
            query.sortBy,
            query.order,
            query.page,
            query.limit,
        );

        res.status(200).json({ success: true, ...result });
    } catch (error) {
        next(error);
    }
}

export async function getProductById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const id = req.params.id as string;
        const storeId = req.storeId ?? req.params.storeId as string;

        const product = await ProductService.findProductById(id, storeId);

        res.status(200).json({
            "success": true, 
            "data":  product
        });
    } catch (error) {
        next(error);
    }

}

export async function updateProduct(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const { sku, name, price, stock, description, costPrice, categoryId } = req.body;
        const id = req.params.id as string;
        const storeId = req.storeId ?? req.params.storeId as string;

        const updatedProduct = await ProductService.updateProduct(id, storeId, sku, name, price, stock, description, costPrice, categoryId)
        
        res.status(200).json({
            "success": true, 
            "data":  updatedProduct
        });      
    } catch (error) {
        next(error);
    }
}

export async function deleteProduct(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const id = req.params.id as string;
        const storeId = req.storeId ?? req.params.storeId as string;

        await ProductService.deleteProduct(id, storeId);

        res.status(204).send();
    } catch (error) {
        next(error);
    }

}