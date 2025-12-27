// src/utils/auth.ts

// Save token
export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

// Get token
export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

// Remove token (logout)
export const removeToken = () => {
  localStorage.removeItem("token");
};

// Decode token to check expiry
export const isTokenExpired = (): boolean => {
  const token = getToken();
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const exp = payload.exp * 1000;
    return Date.now() > exp;
  } catch {
    return true;
  }
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!getToken() && !isTokenExpired();
};
