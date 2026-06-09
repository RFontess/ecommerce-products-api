import prisma from "../lib/prisma";

export async function create(name: string, storeId: string){
    return prisma.category.create({
        data: {
            name,
            storeId
        },
    });
}

export async function update(id: string, name?: string){
    return prisma.category.update({
        where: { id },
        data: { name }
    });
}

export async function remove(id: string){
    return prisma.category.delete({
        where: { id }
    });
}

export async function findAll(storeId: string){
    return prisma.category.findMany({
         where: { storeId }
    })
}

export async function findById(id: string, storeId: string){
    return prisma.category.findFirst({
        where: {
            id,
            storeId
        },
    });
}