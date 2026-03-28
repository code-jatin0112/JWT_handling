export const saveAuth = (data) => {
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));
};

export const logout = () => {
  localStorage.clear();
};

export const isAuth = () => {
  return !!localStorage.getItem('token');
};