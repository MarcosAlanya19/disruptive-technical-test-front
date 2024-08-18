import React, { createContext, useContext } from 'react';
import { IregisterPayload, IregisterResponse, registerRequest } from '../../modules/register/services/auth.service';

interface IProps {
  children: React.ReactNode;
}

interface IConfigContext {
  user: IregisterResponse;
  signup: (values: IregisterPayload) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext({} as IConfigContext);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider: React.FC<IProps> = (props) => {
  const [user, serUser] = React.useState<IregisterResponse>({} as IregisterResponse);
  const [isAuthenticated, serIsAuthenticated] = React.useState<boolean>(false);

  const signup = async (values: IregisterPayload) => {
    try {
      const res = await registerRequest({ payload: values });
      serUser(res.data);
      serIsAuthenticated(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        isAuthenticated,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
