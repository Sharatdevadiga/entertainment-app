import Logo from "../components/Logo";
import useForm from "../hooks/useForm";
import InputField from "../components/form/InputField";
import { validateEmail } from "../utils/validators";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

function LoginPage() {
  const initialValues = {
    email: "",
    password: "",
  };

  const validations = {
    email: validateEmail,
  };

  // CUSTOM HOOKS
  const { loginStatus, loginMessage, handleLogin } = useLogin();

  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleFocus,
    handleSubmit,
    resetFields,
  } = useForm(initialValues, validations, () =>
    handleLogin(values, resetFields),
  );

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-12 p-6">
      <Logo />
      <form onSubmit={handleSubmit} className="form--auth">
        <h1 className="text-heading-l">Login</h1>

        <InputField
          name="email"
          type="email"
          placeholder="Email address"
          value={values.email}
          error={errors.email}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        <InputField
          name="password"
          type="password"
          placeholder="Password"
          value={values.password}
          error={errors.password}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        <p
          className={`text-center text-body-s ${loginStatus ? (loginStatus === "success" ? "text-green-400 opacity-50" : loginStatus === "fail" ? "text-primary opacity-80" : "opacity-0") : "opacity-0"}`}
        >
          {loginMessage?.length ? loginMessage : "."}
        </p>

        <button type="submit" className="btn--cta" disabled={isSubmitting}>
          {isSubmitting ? "Logging in" : "Login to your account"}
        </button>

        <p className="text-center text-body-s">
          Donot have an account?{" "}
          <Link className="text-primary" to="/signup">
            Signup
          </Link>
        </p>
      </form>
    </main>
  );
}

export default LoginPage;
