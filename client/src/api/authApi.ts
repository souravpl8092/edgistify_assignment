import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${apiUrl}/api/auth/login`, {
    email,
    password,
  });
  return response.data;
};

export const signupUser = async (
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
