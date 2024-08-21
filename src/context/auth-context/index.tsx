import Cookies from 'js-cookie';
import React from 'react';
import { IloginPayload, loginRequest } from '../../modules/auth/services/login.service';
import { logoutRequest } from '../../modules/auth/services/logout.service';
import { IregisterPayload, registerRequest } from '../../modules/auth/services/register.service';
import { verifyRequest } from '../../modules/auth/services/verify.service';
import { IAuthResponse } from '../../modules/auth/types/IAuthResponse';

interface IProps {
  children: React.ReactNode;
}

interface IConfigContext {
  user: IAuthResponse;
  isAuthenticated: boolean;
  signup: (values: IregisterPayload) => Promise<void>;
  signin: (values: IloginPayload) => Promise<void>;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = React.createContext<IConfigContext | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider: React.FC<IProps> = ({ children }) => {
  const [user, setUser] = React.useState<IAuthResponse>({} as IAuthResponse);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

  const handleAuthState = (isAuth: boolean, userData: IAuthResponse) => {
    setUser(userData);
    setLoading(false);
    setIsAuthenticated(isAuth);
  };

  const signup = async (values: IregisterPayload) => {
    const res = await registerRequest({ payload: values });
    handleAuthState(true, res.data);
  };

  const signin = async (values: IloginPayload) => {
    const res = await loginRequest({ payload: values });
    handleAuthState(true, res.data);
  };

  const logout = async () => {
    await logoutRequest();
    handleAuthState(false, {} as IAuthResponse);
  };

  React.useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get('token');
      if (!token) {
        handleAuthState(false, {} as IAuthResponse);
        return;
      }

      if (isAuthenticated) return;
      try {
        const res = await verifyRequest();
        handleAuthState(res.data ? true : false, (res.data || ({} as unknown)) as IAuthResponse);
      } catch (error) {
        handleAuthState(false, {} as IAuthResponse);
      }
    };

    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        signin,
        isAuthenticated,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
