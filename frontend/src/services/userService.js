import api from './api.js';

export const getUsers = async () => {
  const { data } = await api.get('/users');
  return data;
};

export const deleteUser = async (id) => {
  const { data } = await api.delete(`/users/${id}`);
  return data;
};
