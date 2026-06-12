import * as StoreRepository from "../repositories/store.repository"
import { AppError } from "../errors/app-error";

export async function createStore(name: string, email: string, password: string){
    return StoreRepository.create(name, email, password);
}

export async function getAllStores(){
    return StoreRepository.findAll();
}

export async function getStoreById(id: string){
    const store = await StoreRepository.findById(id);

    if(!store){
        throw new AppError("Nenhuma loja encontrada", 404);
    }

    return store;
}

export async function updateStore(id: string, name?: string, email?: string, password?: string){
    await getStoreById(id);

    return StoreRepository.update(id, name, email, password);
}

export async function deleteStore(id: string){
    await getStoreById(id);

    return StoreRepository.softDelete(id);
}