import axios from "axios";

// const apiUrl = process.env.REACT_APP_API_URL;

const apiUrl = "http://localhost:8080";

// Login API call
export const loginApi = async (email: string, password: string) => {
  const response = await axios.post(`${apiUrl}/api/auth/login`, {
    email,
    password,
  });

  if (!response.data.token) {
    throw new Error("Token not received from API");
  }

  return {
    token: response.data.token,
    user: response.data.user,
  };
};

// Signup API call
export const signupApi = async (
  name: string,
  email: string,
  password: string
) => {
  const response = await axios.post(`${apiUrl}/api/auth/register`, {
    name,
    email,
    password,
  });

  return response.data;
};

// Logout function (client-side)
export const logoutApi = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
