export const signup = async function (email, password) {
  const response = await fetch("/api/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    throw new Error({ message: "Sign up failed" });
  }
};
