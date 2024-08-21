import { ERoleUser } from '../services/register.service';

export interface IAuthResponse {
  success: boolean;
  message: string;

  token: string;
  data: {
    uuid: string;
    username: string;
    email: string;
    role: ERoleUser;
    credits: number;
  };
}
