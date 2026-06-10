import { z } from 'zod';

export const categoryCreateSchema = z.object({
    name: z.string().nonempty("Informe o nome da categoria!")
})

export const categoryUpdateSchema = categoryCreateSchema.partial()