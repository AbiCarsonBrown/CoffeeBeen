import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:8000";

const fetchCoffeeShops = async () => await axios.get(`${baseUrl}/coffeeshops`);

const fetchCoffeeShop = async (id) =>
  await axios.get(`${baseUrl}/coffeeshops/${id}`);

const logIn = async (user) => await axios.post(`${baseUrl}/auth/login`, user);

const signUp = async (user) => await axios.post(`${baseUrl}/auth/signup`, user);

export { fetchCoffeeShops, fetchCoffeeShop, logIn, signUp };
