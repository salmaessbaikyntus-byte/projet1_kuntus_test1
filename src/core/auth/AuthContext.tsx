import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Role } from '../../shared/types';

interface AuthContextType {
  user: User | null;
  login: (role: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'Jean Manager',
    email: 'jean.manager@shiftmaster.com',
    role: 'MANAGER',
  });

  const login = (role: Role) => {
    setUser({
      id: '1',
      name: `User ${role}`,
      email: `${role.toLowerCase()}@shiftmaster.com`,
      role,
    });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
