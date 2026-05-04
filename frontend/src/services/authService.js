import api from './api.js';

const LOCAL_USERS_KEY = 'lms_local_users';

const getLocalUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_USERS_KEY) || '[]');
  } catch (error) {
    return [];
  }
};

const saveLocalUsers = (users) => {
  localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
};

const shouldFallback = (error) => {
  const message = error?.message || '';
  return /method not allowed|network|failed to fetch|something went wrong/i.test(message);
};

export const loginUser = async (payload) => {
  try {
    const { data } = await api.post('/auth/login', payload);
    return data;
  } catch (error) {
    if (!shouldFallback(error)) {
      throw error;
    }
    const users = getLocalUsers();
    const user = users.find((entry) => entry.email === payload.email);
    if (!user || user.password !== payload.password) {
      throw new Error('Invalid credentials.');
    }
    return {
      token: `local-${user.id}`,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role || 'student',
      },
    };
  }
};

export const registerUser = async (payload) => {
  try {
    const { data } = await api.post('/auth/register', payload);
    return data;
  } catch (error) {
    if (!shouldFallback(error)) {
      throw error;
    }
    const users = getLocalUsers();
    const exists = users.some((entry) => entry.email === payload.email);
    if (exists) {
      throw new Error('User already exists.');
    }
    const user = {
      id: `local-${Date.now()}`,
      name: payload.name,
      email: payload.email,
      password: payload.password,
      role: payload.role || 'student',
    };
    saveLocalUsers([...users, user]);
    return {
      token: `local-${user.id}`,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
};
