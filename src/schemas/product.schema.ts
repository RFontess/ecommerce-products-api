import { z } from 'zod';

export const productCreateSchema = z.object({
    sku: z.string().nonempty("Informe o SKU do produto!"),
    name: z.string().nonempty("Informe o nome do produto!"),
    price: z.number().positive("Informe um preço maior que zero!"),
    stock: z.number().int("Informe um número inteiro!"),
    categoryId: z.string().uuid().optional(),
    description: z.string().optional(),
    costPrice: z.number().positive("Informe um preço de custo maior que zero!").optional()

})

export const productUpdateSchema = productCreateSchema.partial()