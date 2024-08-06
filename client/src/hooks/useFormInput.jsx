// import { useState } from "react";

// const useFormInput = function (initialValue = "", validate = () => true) {
//   const [value, setValue] = useState(initialValue);
//   const [error, setError] = useState(null);

//   const handleChange = function (e) {
//     setValue(e.target.value);
//     setError(null);
//   };

//   const handleFocus = function () {
//     setError(null);
//   };

//   const handleBlur = function () {
//     const { isValid, errorMessage } = validate(value);
//     if (!isValid) setError(errorMessage);
//   };

//   const reset = function () {
//     setValue("");
//     setError(null);
//   };

//   return {
//     value,
//     error,
//     setError,
//     onChange: handleChange,
//     onBlur: handleBlur,
//     onfocus: handleFocus,
//     reset,
//   };
// };

// export default useFormInput;
