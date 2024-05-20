import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AppLayout from "./layout/AppLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateAccount from "./pages/CreateAccount";
import FindaDorm from "./pages/FindaDorm";
import PostmyDorm from "./pages/PostmyDorm";
import About from "./pages/About";
import Help from "./pages/Help";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsofService from "./pages/TermsofService";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<AppLayout />}>
          <Route
            index
            element={<Home />}
          />
          <Route
            path="account"
            element={<CreateAccount />}
          />
          <Route
            path="login"
            element={<Login />}
          />
          <Route
            path="register"
            element={<Register />}
          />
          <Route
            path="dorms"
            element={<FindaDorm />}
          />
          <Route
            path="business"
            element={<PostmyDorm />}
          />
          <Route
            path="about"
            element={<About />}
          />
          <Route
            path="faqs"
            element={<Help />}
          />
          <Route
            path="privacy"
            element={<PrivacyPolicy />}
          />
          <Route
            path="terms"
            element={<TermsofService />}
          />
          <Route
            path="profile"
            element={<Profile />}
          />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
    </>
  );
};

export default App;
