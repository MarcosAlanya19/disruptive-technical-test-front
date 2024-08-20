import { z } from 'zod';

export const contentSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'El título del contenido debe tener al menos 3 caracteres.' })
    .max(100, { message: 'El título del contenido no puede exceder los 100 caracteres.' }),
  url: z
    .string()
    .optional()
    .refine((value) => !value || /^https?:\/\/[^\s$.?#].[^\s]*$/.test(value), {
      message: 'La URL proporcionada no es válida.',
    }),
  textContent: z.string().optional(),
  type: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .refine(obj => obj !== null && obj.value.trim().length > 0, {
      message: 'Selecciona un tipo válido.',
    })
    .optional(),
  categoryId: z
    .object({
      value: z.string(),
      label: z.string().optional(),
    })
    .refine(obj => obj !== null && obj.value.trim().length > 0, {
      message: 'El campo de categoría es obligatorio.',
    }),
  themeId: z
    .object({
      value: z.string(),
      label: z.string().optional(),
    })
    .refine(obj => obj !== null && obj.value.trim().length > 0, {
      message: 'El campo de tema es obligatorio.',
    })
});
