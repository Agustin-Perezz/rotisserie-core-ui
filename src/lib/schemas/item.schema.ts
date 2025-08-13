import z from 'zod';

export const createItemSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  description: z.optional(
    z.string().max(200, 'La descripción no puede exceder los 200 caracteres')
  ),
  price: z.number().min(0, 'El precio debe ser un número positivo'),
  shopId: z.string().min(1, 'El ID de la tienda es obligatorio')
});
