// import { BASE_URL, SIGNUP_ENDPOINT } from "../config/config";
import { BASE_URL, endpoints, RETRY } from "../config/config";

export const signup = async function (email, password) {
  try {
    const response = await fetch(`${BASE_URL}${endpoints.signup}`, {
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
    const response = await fetch(`${BASE_URL}${endpoints.login}`, {
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

export const fetcher = async function (endpoint) {
  let tries = 0;

  while (tries < RETRY) {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`);

      if (!response.ok) {
        throw new Error(` Error: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      tries++;
      if (tries >= RETRY) throw new Error(err);
    }
  }
};

// export const fetchTrending = async function () {
//   try {
//     const response = await fetch(`${BASE_URL}${endpoints.trending}`);
//     const data = await response.json();
//     console.log(data);
//     return data;
//   } catch (err) {
//     throw new Error(err);
//   }
// };
