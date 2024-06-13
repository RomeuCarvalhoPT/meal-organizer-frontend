import axios from "../api/axios";

export const registerUser = async (username, password) => {
  try {
    const response = await axios.post('/users/register', { username, password });
    return response;
  } catch (error) {
    console.error('Register failed', error);
    throw error;
  }
};


export const loginUser = async (username, password) => {
  try {
    const response = await axios.post('/users/login', { username, password });
    return response;
  } catch (error) {
    console.error('Login failed', error);
    throw error;
  }
};