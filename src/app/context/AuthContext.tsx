'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

interface User {
  _id: string;
  name: string;
  username?: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: any) => void;
  logout: () => void;
  isAuthenticated: boolean;
  openAuthModal: () => void;
  setOpenAuthModal: (callback: () => void) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authModalCallback, setAuthModalCallback] = useState<(() => void) | null>(null);

  useEffect(() => {
    // Check if user is logged in on mount
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (userData: any) => {
    const userObj = {
      _id: userData._id,
      name: userData.name,
      username: userData.username || userData.name,
      email: userData.email
    };
    setUser(userObj);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  const openAuthModal = useCallback(() => {
    if (authModalCallback) {
      authModalCallback();
    }
  }, [authModalCallback]);

  const setOpenAuthModal = useCallback((callback: () => void) => {
    setAuthModalCallback(() => callback);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, openAuthModal, setOpenAuthModal }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
