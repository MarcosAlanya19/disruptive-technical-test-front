import React from 'react';
import Cookies from 'js-cookie';
import { IloginPayload, loginRequest } from '../../modules/register/services/login.service';
import { IregisterPayload, IregisterResponse, registerRequest } from '../../modules/register/services/register.service';
import { verifyRequest } from '../../modules/register/services/verify.service';

interface IProps {
  children: React.ReactNode;
}

interface IConfigContext {
  user: IregisterResponse;
  isAuthenticated: boolean;
  signup: (values: IregisterPayload) => Promise<void>;
  signin: (values: IloginPayload) => Promise<void>;
  loading: boolean;
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
    setIsAuthenticated(isAuth);
    setUser(userData);
    setLoading(false);
  };

  const signup = async (values: IregisterPayload) => {
    try {
      const res = await registerRequest({ payload: values });
      handleAuthState(true, res.data);
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  const signin = async (values: IloginPayload) => {
    try {
      await loginRequest({ payload: values });
      handleAuthState(true, {} as IregisterResponse); // No user data on signin, adjust as needed
    } catch (error) {
      console.error('Signin error:', error);
    }
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
        handleAuthState(res.data ? true : false, res.data || {} as IregisterResponse);
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
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
