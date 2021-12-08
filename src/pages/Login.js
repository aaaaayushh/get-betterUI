import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "reactstrap";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { AuthContext } from "../App";

export const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const initState = {
    email: "",
    password: "",
    error: null,
  };
  const [data, setData] = useState(initState);
  const [authError, setAuthError] = useState(false);
  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setData({ ...data, error: null });

    fetch("http://localhost:3000/auth/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.email,
        password: data.password,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((resJson) => {
        console.log(resJson);
        if (!resJson.user) {
          setAuthError(true);
          return;
        } else {
          dispatch({ type: "LOGIN", payload: resJson });
          navigate("/");
        }
      })
      .catch((err) => {
        setData({
          ...data,
          error: err.message || err.statusText,
        });
      });
  };

  return (
    <div className="d-flex align-items-center vh-100">
      <div className="card col-6 mx-auto shadow shadow-lg">
        <div className="container">
          <Form onSubmit={handleSubmit}>
            <h1 className="text-center m-5">Login</h1>
            <FormGroup>
              {authError && (
                <Alert color="danger">Incorrect username or password!</Alert>
              )}
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={data.email}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                value={data.password}
                onChange={handleInputChange}
                placeholder="Password"
                required
              />
            </FormGroup>
            <div className="mb-5 text-center">
              <Button
                color="primary"
                className="rounded-pill btn btn-lg"
                outline
              >
                Login
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};
