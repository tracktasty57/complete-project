// src/services/api.ts
const getApiUrl = () => {
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  if (envUrl && !envUrl.includes("your-backend-url")) {
    return envUrl.endsWith("/auth") ? envUrl : `${envUrl}/auth`;
  }
  return "/api/auth";
};

const API_URL = getApiUrl();

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterData) => {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  let responseData;
  try {
    const text = await res.text();
    responseData = text ? JSON.parse(text) : {};
  } catch (e) {
    responseData = { message: "Invalid JSON response" };
  }

  if (!res.ok) {
    throw new Error(responseData.message || `Registration failed with status ${res.status}`);
  }

  return responseData;
};

export const loginUser = async (data: LoginData) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  let responseData;
  try {
    const text = await res.text();
    responseData = text ? JSON.parse(text) : {};
  } catch (e) {
    responseData = { message: "Invalid JSON response" };
  }

  if (!res.ok) {
    throw new Error(responseData.message || `Login failed with status ${res.status}`);
  }

  return responseData;
};
