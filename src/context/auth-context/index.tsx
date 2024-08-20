import React from 'react';
import Cookies from 'js-cookie';
import { IloginPayload, loginRequest } from '../../modules/auth/services/login.service';
import { IregisterPayload, IregisterResponse, registerRequest } from '../../modules/auth/services/register.service';
import { verifyRequest } from '../../modules/auth/services/verify.service';
import { logoutRequest } from '../../modules/auth/services/logout.service';

interface IProps {
  children: React.ReactNode;
}

interface IConfigContext {
  user: IregisterResponse;
  isAuthenticated: boolean;
  signup: (values: IregisterPayload) => Promise<void>;
  signin: (values: IloginPayload) => Promise<void>;
  loading: boolean;
  logout: () => void
}

const AuthContext = React.createContext<IConfigContext | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider: React.FC<IProps> = ({ children }) => {
  const [user, setUser] = React.useState<IregisterResponse>({} as IregisterResponse);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

  const handleAuthState = (isAuth: boolean, userData: IregisterResponse) => {
    setUser(userData);
    setLoading(false);
    setIsAuthenticated(isAuth);
  };

  const signup = async (values: IregisterPayload) => {
    const res = await registerRequest({ payload: values });
    handleAuthState(true, res.data);
  };

  const signin = async (values: IloginPayload) => {
    await loginRequest({ payload: values });
    handleAuthState(true, {} as IregisterResponse);
  };

  const logout = async () => {
    await logoutRequest();
    handleAuthState(false, {} as IregisterResponse);
  };

  React.useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get('token');
      if (!token) {
        handleAuthState(false, {} as IregisterResponse);
        return;
      }

      try {
        const res = await verifyRequest();
        handleAuthState(res.data ? true : false, (res.data || ({} as unknown)) as IregisterResponse);
      } catch (error) {
        handleAuthState(false, {} as IregisterResponse);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        signin,
        isAuthenticated,
        loading,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
