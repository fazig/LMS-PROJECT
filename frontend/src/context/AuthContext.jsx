import { createContext, useContext, useMemo, useState } from 'react';
import { loginUser, registerUser } from '../services/authService.js';

const AuthContext = createContext(null);

const STORAGE_KEY = 'lms_auth';

const getStoredAuth = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return { token: null, user: null };
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    return { token: null, user: null };
  }
};

export const AuthProvider = ({ children }) => {
  const stored = getStoredAuth();
  const [token, setToken] = useState(stored.token);
  const [user, setUser] = useState(stored.user);
  const [loading, setLoading] = useState(false);

  const persistAuth = (authData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authData));
  };

  const clearAuth = () => {
    localStorage.removeItem(STORAGE_KEY);
  };

  const login = async (payload) => {
    setLoading(true);
    try {
      const data = await loginUser(payload);
      setToken(data.token);
      setUser(data.user);
      persistAuth({ token: data.token, user: data.user });
      return { ok: true };
    } catch (error) {
      return { ok: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload) => {
    setLoading(true);
    try {
      const data = await registerUser(payload);
      setToken(data.token);
      setUser(data.user);
      persistAuth({ token: data.token, user: data.user });
      return { ok: true };
    } catch (error) {
      return { ok: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    clearAuth();
  };

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      isAuthenticated: Boolean(token),
      login,
      register,
      logout,
    }),
    [token, user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
