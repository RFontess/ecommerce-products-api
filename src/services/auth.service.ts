import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as StoreRepository from '../repositories/store.repository';
import * as StoreService from './store.service';
import { AppError } from '../errors/app-error';

export async function register(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const store = await StoreService.createStore(name, email, hashedPassword);

    const { password: _, ...storeWithoutPassword } = store;

    return storeWithoutPassword;
}

export async function login(email: string, password: string) {
    const store = await StoreRepository.findByEmail(email);

    if (!store) {
        throw new AppError("Credenciais inválidas", 401);
    }

    const passwordMatch = await bcrypt.compare(password, store.password);

    if (!passwordMatch) {
        throw new AppError("Credenciais inválidas", 401);
    }

    const token = jwt.sign(
        { storeId: store.id },
        process.env.JWT_SECRET as string,
        { expiresIn: '1d' }
    );

    return { token };
}
