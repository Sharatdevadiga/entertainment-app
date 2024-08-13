import { useState } from "react";
import { login } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { markAuthenticated } from "../features/auth/authSlice";

const useLogin = function () {
  const [loginStatus, setloginStatus] = useState(undefined);
  const [loginMessage, setloginMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async function (values, resetFields) {
    try {
      const data = await login(values.email, values.password);

      if (data?.status === "success") {
        setloginStatus("success");
        dispatch(
          markAuthenticated({
            isAuthenticated: true,
            user: { email: values.email },
          }),
        );

        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setloginStatus("fail");
      }

      setloginMessage(data?.message);
    } catch (err) {
      console.error(err);
      setloginStatus("fail");
      setloginMessage("login failed. Please try again.");
    }

    resetFields();
  };

  return { loginStatus, loginMessage, handleLogin };
};

export default useLogin;
