import { z } from 'zod';

export const authLoginSchema = z.object({
    email: z.string().email("Informe um email válido!"),
    password: z.string().min(8, "Informe uma senha com pelo menos 8 caracteres!")
});

export const authRegisterSchema = z.object({
    name: z.string().nonempty("Informe o nome da Loja!"),
    email: z.string().email("Informe um email válido!"),
    password: z.string().min(8, "Informe uma senha com pelo menos 8 caracteres!")
});