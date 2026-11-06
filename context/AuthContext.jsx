'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  loading: true
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('impulso_vzla_user');
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Error loading session:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    // Si hay usuario guardado en memoria con ese email
    const registeredUsers = JSON.parse(localStorage.getItem('impulso_vzla_users_db') || '[]');
    const found = registeredUsers.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (found) {
      if (found.password === password) {
        const sessionUser = { ...found };
        delete sessionUser.password;
        setUser(sessionUser);
        localStorage.setItem('impulso_vzla_user', JSON.stringify(sessionUser));
        return { success: true };
      } else {
        return { success: false, error: 'Contraseña incorrecta.' };
      }
    }

    // Usuario demo por defecto para pruebas inmediatas
    if (email === 'demo@impulsovzla.com' && password === '123456') {
      const demoUser = {
        id: 'usr_demo',
        name: 'Carlos Mendoza',
        email: 'demo@impulsovzla.com',
        role: 'creador',
        location: 'Valencia, Carabobo',
        binance_pay_id: '54201948',
        phone: '04141234567'
      };
      setUser(demoUser);
      localStorage.setItem('impulso_vzla_user', JSON.stringify(demoUser));
      return { success: true };
    }

    return { success: false, error: 'Usuario no encontrado. Por favor regístrate primero.' };
  };

  const register = async (userData) => {
    try {
      const registeredUsers = JSON.parse(localStorage.getItem('impulso_vzla_users_db') || '[]');
      const exists = registeredUsers.some(u => u.email.toLowerCase() === userData.email.toLowerCase());
      
      if (exists) {
        return { success: false, error: 'Este correo electrónico ya está registrado.' };
      }

      const newUser = {
        id: `usr_${Date.now()}`,
        ...userData,
        created_at: new Date().toISOString()
      };

      registeredUsers.push(newUser);
      localStorage.setItem('impulso_vzla_users_db', JSON.stringify(registeredUsers));

      const sessionUser = { ...newUser };
      delete sessionUser.password;
      setUser(sessionUser);
      localStorage.setItem('impulso_vzla_user', JSON.stringify(sessionUser));

      return { success: true };
    } catch (e) {
      return { success: false, error: 'Error al registrar usuario: ' + e.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('impulso_vzla_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
