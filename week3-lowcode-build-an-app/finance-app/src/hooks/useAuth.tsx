// Mock auth hook — simulates login/signup/logout using localStorage
// Replace with Auth0 when ready (see auth0.md for integration guide)
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface AuthUser {
  name: string;
  email: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY = 'finance_app_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Restore session from localStorage on mount
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored) as AuthUser);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, _password: string): Promise<void> => {
    // TODO: replace with Auth0 loginWithRedirect()
    await new Promise(resolve => setTimeout(resolve, 600)); // simulate network
    const mockUser: AuthUser = { name: email.split('@')[0] ?? 'User', email };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const signup = async (name: string, email: string, _password: string): Promise<void> => {
    // TODO: replace with Auth0 loginWithRedirect({ screen_hint: 'signup' })
    await new Promise(resolve => setTimeout(resolve, 600)); // simulate network
    const mockUser: AuthUser = { name, email };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const logout = async (): Promise<void> => {
    // TODO: replace with Auth0 logout({ logoutParams: { returnTo: window.location.origin } })
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
