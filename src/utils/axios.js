import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:8000";

const fetchCoffeeShops = async () => await axios.get(`${baseUrl}/coffeeshops`);

const fetchCoffeeShop = async (id) =>
  await axios.get(`${baseUrl}/coffeeshops/${id}`);

const logIn = async (user) => await axios.post(`${baseUrl}/auth/login`, user);

const register = async (user) =>
  await axios.post(`${baseUrl}/auth/register`, user);

const fetchUser = async (token) =>
  await axios.get(`${baseUrl}/profile`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

export { fetchCoffeeShops, fetchCoffeeShop, logIn, register, fetchUser };
