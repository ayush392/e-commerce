import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />

          <Route element={<RequireAuth />}>
            {/* <Route path="cart" element={<Cart />} /> */}
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
