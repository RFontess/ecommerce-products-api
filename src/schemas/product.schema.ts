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

export const productQuerySchema = z.object({
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().optional(),
    sortBy: z.enum(["price", "name", "dateCreated", "stock"]).optional(),
    order: z.enum(["asc", "desc"]).optional(),
    categoryId: z.string().uuid().optional(),
    minPrice: z.coerce.number().positive().optional(),
    maxPrice: z.coerce.number().positive().optional(),
    name: z.string().optional(),
})