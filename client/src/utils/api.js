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

export const logout = async function () {
  try {
    const response = await fetch(`${BASE_URL}${endpoints.logout}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(),
    });

    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const addBookmark = async function (
  endpoint = endpoint.bookmark,
  body = null,
  method = "POST",
) {
  let tries = 0;
  const url = `${BASE_URL}${endpoint}`;

  while (tries < RETRY) {
    try {
      const options = {
        method: method.toUpperCase(),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (body) {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(url, options);

      if (response.status == 401) return response;

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      tries++;
      if (tries >= RETRY) {
        throw new Error(err);
      }
    }
  }
};

export const deleteBookmark = async function (
  endpoint = endpoints.bookmark,
  body,
  method = "DELETE",
) {
  let tries = 0;
  const url = `${BASE_URL}${endpoint}`;

  while (tries < RETRY) {
    try {
      const options = {
        method: method.toUpperCase(),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (body) {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(url, options);

      if (response.status === 401) return response;

      if (!response.ok) {
        throw new Error(`Failed to delete bookmark: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      tries++;
      if (tries >= RETRY) {
        throw new Error(
          `Delete bookmark failed after ${RETRY} retries: ${err.message}`,
        );
      }
    }
  }
};

export const getBookMarks = async function (
  endpoint = endpoints.bookmark,
  method = "GET",
) {
  let tries = 0;
  const url = `${BASE_URL}${endpoint}`;

  while (tries < RETRY) {
    try {
      const options = {
        method: method.toUpperCase(),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(url, options);

      if (response.status == 401) return response;

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      tries++;
      if (tries >= RETRY) {
        throw new Error(err);
      }
    }
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
