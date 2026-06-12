import * as CategoryRepository from "../repositories/category.repository";
import { getStoreById } from "./store.service"; 
import { AppError } from "../errors/app-error";

export async function createCategory(name: string, storeId: string){
    await getStoreById(storeId);

    return CategoryRepository.create(name, storeId);
}

export async function getAllCategories(storeId: string){
    await getStoreById(storeId);

    return CategoryRepository.findAll(storeId);
}

export async function getCategoryById(id: string, storeId: string){
    await getStoreById(storeId);

    const category = await CategoryRepository.findById(id, storeId);

    if(!category){
        throw new AppError("Nenhuma categoria encontrada", 404);
    }
    
    return category;
}

export async function updateCategory(id: string, storeId: string, name?: string){
    await getCategoryById(id, storeId);

    return CategoryRepository.update(id, name);
}

export async function deleteCategory(id: string, storeId: string){
    await getCategoryById(id, storeId);

    return CategoryRepository.remove(id);
}