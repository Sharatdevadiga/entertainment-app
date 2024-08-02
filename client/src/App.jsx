import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <div>
      {/* <h1>ENTERTAINMENT APP</h1> */}
      <Routes>
        <Route path="signup" element={<SignupPage />} />
      </Routes>
    </div>
  );
}

export default App;
