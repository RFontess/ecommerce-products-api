import prisma from "../lib/prisma";

export async function create(name: string, email: string, password: string){
    return prisma.store.create({
        data: {
            name,
            email,
            password,
        },
    });
}

export async function update(id: string, name?: string, email?: string, password?: string){
    return prisma.store.update({
        where: { id },
        data: {
            name,
            email,
            password
        }
    });
}

export async function softDelete(id: string){
    return prisma.store.update({
        where: { id },
        data: { active: false }
    });
}

export async function findAll(){
    return prisma.store.findMany({ 
        where: { active : true } 
    })
}

export async function findById(id:string){
    return prisma.store.findUnique({
        where: {
            id,
            active: true
        },
    });
}