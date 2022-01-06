import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login/Login";
import { NavigationBar } from "./components/NavigationBar/Navbar";
import { Signup } from "./pages/Signup/Signup";
import GetBetter from "./pages/getBetter/GetBetter";
import PrivateRoute from "./components/PrivateRoute";
import Landing from "./pages/Landing/Landing";
import Home from "./pages/Home/Home";
import Profile from "./pages/profile/Profile";
export const AuthContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "SIGNUP":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuth: true,
        user: JSON.stringify(action.payload.user),
        token: action.payload.token,
      };
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));

      return {
        ...state,
        isAuth: true,
        user: JSON.stringify(action.payload.user),
        token: action.payload.token,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuth: false,
        user: null,
      };
    default:
      return state;
  }
};

function App() {
  const initState = {
    isAuth: localStorage.getItem("user") ? true : false,
    user: localStorage.getItem("user") ? localStorage.getItem("user") : null,
    token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
  };
  const [state, dispatch] = React.useReducer(reducer, initState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <BrowserRouter>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route
              path="/get-better"
              element={
                <PrivateRoute>
                  <GetBetter />
                </PrivateRoute>
              }
            />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
