import { useState } from "react";
import useFormInput from "../hooks/useFormInput";
import Logo from "../components/Logo";
import InputField from "../components/InputField";
import { Link } from "react-router-dom";
import { validateEmail, validatePassword } from "../utils/validators";
import { signup } from "../utils/api";

function SignupPage() {
  const email = useFormInput("", validateEmail);
  const password = useFormInput("", validatePassword);
  const repeatPassword = useFormInput("");
  const [serverError, setServerError] = useState(null);

  const resetFields = () => {
    email.reset();
    password.reset();
    repeatPassword.reset();
  };

  function checkForError() {
    if (password.value !== repeatPassword.value) {
      repeatPassword.setError("Passwords do not match");
      return;
    }
    !email.value.length && email.setError("Cant be empty");
    !password.value.length && password.setError("Cant be empty");
    !repeatPassword.value.length && repeatPassword.setError("Cant be empty");

    const hasError = [email, password, repeatPassword].some((item) => {
      return item.error || item.value.length === 0;
    });

    return hasError;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (checkForError()) {
      setServerError("Please fill the details");
      return;
    }

    try {
      const data = await signup(email.value, password.password);
      console.log(data);
      if (data) resetFields();
    } catch (err) {
      console.log(err);
      setServerError("Signup failed! please try again");
    }
  };

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-12 p-6">
      <Logo />
      <form onSubmit={handleSubmit} className="form--auth">
        <h1 className="text-heading-l">Sign Up</h1>

        <InputField
          name="email"
          type="email"
          placeholder="Email address"
          value={email.value}
          error={email.error}
          onChange={email.onChange}
          onFocus={() => email.setError("")}
          onBlur={email.onBlur}
        />

        <InputField
          name="password"
          type="password"
          placeholder="Password"
          value={password.value}
          error={password.error}
          onChange={password.onChange}
          onFocus={() => password.setError("")}
          onBlur={password.onBlur}
        />

        <InputField
          name="repeatPassword"
          type="password"
          placeholder="Repeat password"
          value={repeatPassword.value}
          error={repeatPassword.error}
          onChange={repeatPassword.onChange}
          onFocus={() => repeatPassword.setError("")}
          onBlur={repeatPassword.onBlur}
        />
        <p
          className={`text-center text-body-s text-primary ${serverError?.length ? "opacity-100" : "opacity-0"}`}
        >
          {serverError?.length ? serverError : "No error"}
        </p>

        <button type="submit" className="btn--cta">
          Create an account
        </button>

        <p className="text-center text-body-s">
          Already have an account?{" "}
          <Link className="text-primary" to="/login">
            Login
          </Link>
        </p>
      </form>
    </main>
  );
}

export default SignupPage;
