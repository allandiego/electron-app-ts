import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface SignInCredencials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: Record<string, unknown>;
  signIn(credencials: SignInCredencials): Promise<void>;
  signOut(): void;
}

interface AuthState {
  token: string;
  user: Record<string, unknown>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@SerialNode:token');
    const user = localStorage.getItem('@SerialNode:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', { email, password });

    const { token, user } = response.data;
    // const token = 'token-jwt';
    // const user = { id: 1, name: 'Diego' };

    localStorage.setItem('@SerialNode:token', token);
    localStorage.setItem('@SerialNode:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@SerialNode:token');
    localStorage.removeItem('@SerialNode:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
}

export { AuthProvider, useAuth };
