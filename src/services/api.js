import axios from "axios";

const API = axios.create({
  baseURL: "https://urban-style-api.onrender.com",
});

export default API;

/* Products */
export const getProducts = () =>
  API.get("/products");

/* Users */
export const getUsers = () =>
  API.get("/users");

export const addUser = (user) =>
  API.post("/users", user);

/* Orders */
export const getOrders = () =>
  API.get("/orders");

export const addOrder = (order) =>
  API.post("/orders", order);

/* Reviews */
export const getReviews = () =>
  API.get("/reviews");

export const addReview = (review) =>
  API.post("/reviews", review);

/* Payments */
export const addPayment = (
  payment
) =>
  API.post("/payments", payment);

/* Contact */
export const addContact = (
  data
) =>
  API.post("/contact", data);