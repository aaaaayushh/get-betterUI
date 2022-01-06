import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../App";

const PrivateRoute = ({ children }) => {
  const { state } = useContext(AuthContext);
  // useEffect(() => {
  // console.log(state);
  // });
  return state.isAuth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
