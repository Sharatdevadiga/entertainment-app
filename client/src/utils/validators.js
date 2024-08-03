const validateEmail = function (email) {
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const errorMessage = "Invalid Email";
  return { isValid, errorMessage };
};

const validatePassword = function (password) {
  const isValid = password.length >= 8;
  const errorMessage = "Atleast 8 characters";
  return { isValid, errorMessage };
};

const validateRepeatPassword = function (value, values) {
  const isValid = value === values.password;
  const errorMessage = "Passwords donot match";
  return { isValid, errorMessage };
};

export { validateEmail, validatePassword, validateRepeatPassword };
