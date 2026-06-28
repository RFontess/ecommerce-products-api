import { Prisma } from "../generated/prisma";
import * as ProductRepository from "../repositories/product.repository";
import { getStoreById } from "./store.service";
import { getCategoryById } from "./category.service"; 
import { AppError } from "../errors/app-error";

export async function createProduct(sku: string, name: string, price: number, stock: number, storeId: string, description?: string, costPrice?: number, categoryId?: string) {
    await getStoreById(storeId);
    
    if(categoryId){
        await getCategoryById(categoryId, storeId);
    }

    return ProductRepository.create(sku, name, price, stock, storeId, description, costPrice, categoryId);
}

export async function findAllProducts(storeId: string, categoryId?: string, minPrice?: number, maxPrice?: number, name?: string, sortBy?: "price" | "name" | "dateCreated" | "stock", order?: "asc" | "desc", page?: number, limit?: number) {
    await getStoreById(storeId);

    if(!page){
        page = 1;
    };
    if(!limit){
        limit = 10;
    };
    if(!order){
        order = "desc"
    }
    
    const skip = (page - 1) * limit;
    const orderBy = { [sortBy ?? "dateCreated"]: order } 

    const where: Prisma.ProductWhereInput = {
        storeId,
        available: true,
    }

    if(categoryId) where.categoryId = categoryId;
    if(name) where.name = { contains: name, mode: "insensitive" };
    if(minPrice) where.price = { gte: minPrice};
    if(maxPrice) where.price = { ...(where.price as object), lte: maxPrice};

    const [data, total] = await Promise.all([
        ProductRepository.findAll(where, orderBy, skip, limit), 
        ProductRepository.count(where)
    ]);

    return { 
            "data": data,
            "meta": {
                "total": total,
                "page": page,  
                "limit": limit,
                "totalPages": Math.ceil( total / limit)
            }
             
            }
}

export async function findProductById(id: string, storeId: string) {
    const product = await ProductRepository.findById(id);

    if(!product){
        throw new AppError("Nenhum produto encontrado", 404);
    }

    const { storeId: storeIdProduct } = product;

    if( storeId === storeIdProduct ){
        return product;
    } else {
        throw new AppError("Você não possui permissão para acessar este recurso", 403);
    }
}

export async function updateProduct(id: string, storeId: string, sku?: string, name?: string, price?: number, stock?: number,  description?: string, costPrice?: number, categoryId?: string) {
    await findProductById(id, storeId);

    const data = {sku, name, price, stock, description, costPrice, categoryId}
    return ProductRepository.update(id, data );
}

export async function deleteProduct(id: string, storeId: string) {
    await findProductById(id, storeId);

    return ProductRepository.softDelete(id);
}