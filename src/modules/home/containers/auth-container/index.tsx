import React from 'react';
import { useAuth } from '../../../../context/auth-context';
import { ERoleUser } from '../../../auth/services/register.service';
import { Auth } from '../../../auth';

interface ILoginPayload {
  email: string;
  password: string;
}

interface IRegisterPayload extends ILoginPayload {
  username: string;
  role: ERoleUser;
}

export interface IAuthPayload {
  isRegistering: boolean;
  loginPayload: ILoginPayload;
  registerPayload: IRegisterPayload;
}

export const AuthContainer: React.FC = () => {
  const { signup, signin } = useAuth();

  const handleAuthSubmit = ({ isRegistering, loginPayload, registerPayload }: IAuthPayload) => {
    console.log({ isRegistering, loginPayload, registerPayload });

    if (isRegistering) {
      signin(loginPayload);
      return;
    }
    signup(registerPayload);
  };

  return <Auth onSubmit={handleAuthSubmit} />;
};
