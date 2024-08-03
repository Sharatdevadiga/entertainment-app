import { useState } from "react";
import { signup } from "../utils/api";

const useSignUp = function () {
  const [signupStatus, setSignupStatus] = useState(undefined);
  const [signupMessage, setSignupMessage] = useState(null);

  const handleSignup = async function (values, resetFields) {
    try {
      const data = await signup(values.email, values.password);
      console.log(data);

      if (data?.status === "success") {
        setSignupStatus("success");
        console.log("Signup successful");
      } else {
        setSignupStatus("fail");
      }

      setSignupMessage(data?.message);
    } catch (err) {
      console.error(err);
      setSignupStatus("fail");
      setSignupMessage("Signup failed. Please try again.");
    }

    resetFields();
  };

  return { signupStatus, signupMessage, handleSignup };
};

export default useSignUp;
