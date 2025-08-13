import z from 'zod';

export const createItemSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  description: z.optional(
    z.string().max(200, 'La descripción no puede exceder los 200 caracteres')
  ),
  price: z.number().min(0, 'El precio debe ser un número positivo'),
  image: z.optional(
    z
      .instanceof(File, { message: 'Debe ser un archivo válido' })
      .refine((file) => file.size <= 5 * 1024 * 1024, {
        message: 'El archivo no puede superar 5MB'
      })
      .refine(
        (file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
        {
          message: 'Solo se permiten imágenes en formato JPEG, PNG o WebP'
        }
      )
  ),
  shopId: z.string().min(1, 'El ID de la tienda es obligatorio')
});
