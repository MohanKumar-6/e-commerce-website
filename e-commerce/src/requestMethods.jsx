import axios from "axios";


const BASE_URL = "http://localhost:5000/api/"
const persistedRoot = localStorage.getItem("persist:root");

let TOKEN = null;

if (persistedRoot) {
  try {
    const user = JSON.parse(JSON.parse(persistedRoot).user);
    TOKEN = user?.currentUser?.accessToken || null;
  } catch (error) {
    console.error("Error parsing token:", error);
    TOKEN = null;
  }
}


export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: { token: `Bearer ${TOKEN}`},
})