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
  role: ERoleUser | undefined;
}

export interface IAuthPayload {
  isRegistering: boolean;
  loginPayload: ILoginPayload;
  registerPayload: IRegisterPayload;
}

const AuthContainer: React.FC = () => {
  const { signup, signin } = useAuth();

  const handleAuthSubmit = async ({ isRegistering, loginPayload, registerPayload }: IAuthPayload) => {
    if (isRegistering) {
      await signin(loginPayload);
    } else {
      await signup(registerPayload);
    }
    return Promise.resolve();
  };

  return <Auth onSubmit={handleAuthSubmit} />;
};

export default AuthContainer
