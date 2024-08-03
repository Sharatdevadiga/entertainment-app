import { useState } from "react";
import { login } from "../utils/api";

const useLogin = function () {
  const [loginStatus, setloginStatus] = useState(undefined);
  const [loginMessage, setloginMessage] = useState(null);

  const handleLogin = async function (values, resetFields) {
    try {
      const data = await login(values.email, values.password);
      console.log(data);

      if (data?.status === "success") {
        setloginStatus("success");
        console.log("login successful");
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
