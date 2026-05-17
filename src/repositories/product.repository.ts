import prisma from "../lib/prisma";

export async function findAll(){
    return prisma.product.findMany()
}

export async function findById(id:string){
    return prisma.product.findUnique({
        where: {
            id: id,
        },
    });
}