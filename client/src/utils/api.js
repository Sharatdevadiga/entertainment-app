// import { BASE_URL, SIGNUP_ENDPOINT } from "../config/config";
import { BASE_URL } from "../config/config";

export const signup = async function (email, password) {
  try {
    const response = await fetch(`${BASE_URL}api/user/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const login = async function (email, password) {
  try {
    const response = await fetch(`${BASE_URL}api/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const fetchTrending = async function () {
  try {
    const response = await fetch(`${BASE_URL}api/media/trending`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    throw new Error(err);
  }
};
