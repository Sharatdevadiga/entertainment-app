const validateEmail = function (email) {
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const errorMessage = "Invalid Email";
  return { isValid, errorMessage };
};
const validatePassword = function (password) {
  const isValid = password.length >= 8;
  const errorMessage = "Must be atleast 8 character long";
  return { isValid, errorMessage };
};

export { validateEmail, validatePassword };
