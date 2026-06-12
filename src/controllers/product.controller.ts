import * as ProductService from "../services/product.service";
import { Request, Response } from "express";

export async function createProduct(req: Request, res: Response) {
    const { sku, name, price, stock, description, costPrice, categoryId } = req.body;
    const storeId = req.params.storeId as string;

    const productCreated = await ProductService.createProduct(sku, name, price, stock, storeId, description, costPrice, categoryId);
    
    res.status(201).json({
        "success": true, 
        "data":  productCreated
    });
}

export async function getAllProducts(req: Request, res: Response) {
    const storeId = req.params.storeId as string;

    const allProducts = await ProductService.findAllProducts(storeId);

    res.status(200).json({
        "success": true, 
        "data":  allProducts
    });
}

export async function getProductById(req: Request, res: Response) {
    const id = req.params.id as string;
    const storeId = req.params.storeId as string;

    const product = await ProductService.findProductById(id, storeId);

    res.status(200).json({
        "success": true, 
        "data":  product
    });
}

export async function updateProduct(req: Request, res: Response) {
    const { sku, name, price, stock, description, costPrice, categoryId } = req.body;
    const id = req.params.id as string;
    const storeId = req.params.storeId as string;

    const updatedProduct = await ProductService.updateProduct(id, storeId, sku, name, price, stock, description, costPrice, categoryId)
    
    res.status(200).json({
        "success": true, 
        "data":  updatedProduct
    });
}

export async function deleteProduct(req: Request, res: Response) {
    const id = req.params.id as string;
    const storeId = req.params.storeId as string;

    const deletedProduct = await ProductService.deleteProduct(id, storeId);

    res.status(200).json({
        "success": true, 
        "data":  deletedProduct
    });
}