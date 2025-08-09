import z from 'zod';

export const shopFormSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  description: z
    .string()
    .min(10, 'La descripción es obligatoria')
    .max(200, 'La descripción no puede exceder los 200 caracteres'),
  location: z.optional(
    z.string().max(100, 'La ubicación no puede exceder los 100 caracteres')
  )
});
