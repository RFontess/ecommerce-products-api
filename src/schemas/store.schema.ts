import { z } from 'zod';

export const storeCreateSchema = z.object({
    name: z.string().nonempty("Informe o nome da loja!"),
    email: z.string().email("Informe um e-mail válido!"),
    password: z.string().min(8, "Informe uma senha com pelo menos 8 caracteres!"),
});

export const storeUpdateSchema = storeCreateSchema.partial()