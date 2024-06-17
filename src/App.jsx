import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AppLayout from "./layout/AppLayout";
import BusinessLayout from "./layout/BusinessLayout";
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
import ScheduledVisits from "./pages/ScheduledVisits";
import Favorites from "./pages/Favorites";
import OwnerPage from "./pages/OwnerPage";
import SpecificOwnerPage from "./pages/SpecificOwnerPage";
import SpecificDormPage from "./pages/SpecificDormPage";
import OwnerRegister from "./pages/OwnerRegister";
import PostaRental from "./pages/PostaRental";
import { useEffect, useState } from "react";
import { AuthProvider } from "./hooks/useAuth";
import PrivateRoute from "./layout/PrivateRoute";
import PublicOnlyRoute from "./layout/PublicOnlyRoute";
import 'react-loading-skeleton/dist/skeleton.css'


const App = () => {
  return (
    <AuthProvider>
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
            path="owner-register"
            element={<OwnerRegister />}
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
            path="favorites"
            element={<Favorites />}
          />
          <Route
            path="scheduled-visits"
            element={<ScheduledVisits />}
          />
          <Route
            path="dorm/:dormId"
            element={<SpecificDormPage />}
          />
          <Route
            path="owner/:ownerId"
            element={<SpecificOwnerPage />}
          />

          {/* This routes needed Authentication */}
          <Route element={<PrivateRoute redirectTo="/" />}>
            <Route
              path="profile"
              element={<Profile />}
            />
          </Route>

          {/* Public use only for login and register */}
          <Route element={<PublicOnlyRoute redirectTo="/" />}>
            <Route
              path="login"
              element={<Login />}
            />
            <Route
              path="register"
              element={<Register />}
            />
          </Route>

        </Route>

        


        {/* For business layout */}
        <Route
          path="business-side"
          element={<BusinessLayout />}
        >
          <Route
            index
            element={<OwnerPage />}
          />
          <Route path="post-rental" 
          element={<PostaRental />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        transition:Bounce
      />
    </AuthProvider>
  );
};

export default App;
