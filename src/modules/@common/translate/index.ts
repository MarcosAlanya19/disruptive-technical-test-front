import { ERoleUser } from "../../auth/services/register.service";

export const translateRole: Record<ERoleUser, string> = {
  [ERoleUser.READER]: 'Lector',
  [ERoleUser.CREATOR]: 'Creador',
  [ERoleUser.ADMIN]: 'Administrador',
};
