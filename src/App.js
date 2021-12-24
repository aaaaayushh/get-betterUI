import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login/Login";
import { NavigationBar } from "./components/NavigationBar/Navbar";
import { Signup } from "./pages/Signup/Signup";
import GetBetter from "./pages/getBetter/GetBetter";
import PrivateRoute from "./components/PrivateRoute";
import Landing from "./pages/Landing/Landing";
export const AuthContext = React.createContext();
const initState = {
  isAuth: false,
  user: null,
  token: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "SIGNUP":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuth: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));

      return {
        ...state,
        isAuth: true,
        user: action.payload.user,
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
  const [state, dispatch] = React.useReducer(reducer, initState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <BrowserRouter>
          <NavigationBar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/get-better"
              element={
                <PrivateRoute>
                  <GetBetter />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Landing />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
