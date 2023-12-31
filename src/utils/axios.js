import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:8000";

const fetchCoffeeShops = () => axios.get(`${baseUrl}/coffeeshops`);

const fetchCoffeeShop = (id) => axios.get(`${baseUrl}/coffeeshops/${id}`);

const logIn = (user) => axios.post(`${baseUrl}/auth/login`, user);

const register = (user) => axios.post(`${baseUrl}/auth/register`, user);

const fetchUser = (token) =>
  axios.get(`${baseUrl}/profile`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

const fetchUserVisits = (token) =>
  axios.get(`${baseUrl}/profile/visits`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

const postUserVisit = (token, visit) =>
  axios.post(`${baseUrl}/profile/visits`, visit, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

const editUserVisit = (token, visit) =>
  axios.put(`${baseUrl}/profile/visits`, visit, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

const fetchSingleUserVisit = (token, coffeeshop_id) =>
  axios.get(`${baseUrl}/profile/visits/${coffeeshop_id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

export {
  fetchCoffeeShops,
  fetchCoffeeShop,
  logIn,
  register,
  fetchUser,
  fetchUserVisits,
  postUserVisit,
  editUserVisit,
  fetchSingleUserVisit,
};
