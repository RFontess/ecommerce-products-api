import { Prisma } from "../generated/prisma";
import prisma from "../lib/prisma";

export async function create(sku: string, name: string, price: number, stock: number, storeId: string, description?: string, costPrice?: number, categoryId?: string){
    return prisma.product.create({
        data: {
            sku,
            name,
            description,
            price,
            costPrice,
            stock,
            categoryId,
            storeId,
        },
    });
}

export async function update(id: string, data: Prisma.ProductUpdateInput) {
    return prisma.product.update({
        where: { id },
        data,
    });
}

export async function softDelete(id: string){
    return prisma.product.update({
        where: { id },
        data: {available: false}
    });
}

export async function findAll(storeId: string){
    return prisma.product.findMany({
        where: { 
            available: true,
            storeId
        }
    });
}

export async function findById(id: string, storeId: string){
    return prisma.product.findFirst({
        where: { 
            id,
            storeId
        }
    });
}