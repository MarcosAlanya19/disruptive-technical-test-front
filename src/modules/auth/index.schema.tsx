import { z } from 'zod';
import { ICustomOption } from '../@common/types/options';
import { ERoleUser, IregisterPayload } from './services/register.service';

export interface Iform extends Omit<IregisterPayload, 'role'> {
  role: ICustomOption<ERoleUser> | null;
}

export const roleOptions: ICustomOption<ERoleUser>[] = [
  { label: 'Lector', value: ERoleUser.READER },
  { label: 'Creador', value: ERoleUser.CREATOR },
];

const roleSchema = z.object({
  value: z.nativeEnum(ERoleUser),
  label: z.string(),
});

const registerValidationSchema = z.object({
  email: z.string().email({ message: 'Correo electrónico no válido.' }),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres.' }),
  username: z.string().min(1, { message: 'Nombre de usuario es obligatorio.' }),
  role: roleSchema.nullable().refine(value => value !== null, {
    message: 'Selecciona un rol válido.',
  }),
});

const loginValidationSchema = z.object({
  email: z.string().email({ message: 'Correo electrónico no válido.' }),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres.' }),
});

export const getValidationSchema = (isRegistering: boolean) => {
  return isRegistering ? registerValidationSchema : loginValidationSchema;
};
