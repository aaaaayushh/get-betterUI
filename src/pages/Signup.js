import React, { useContext, useState } from "react";
import { Button, Form, FormText, FormGroup, Label, Input } from "reactstrap";
import { AuthContext } from "../App";

export const Signup = () => {
  const { dispatch } = useContext(AuthContext);
  const initState = { firstname: "", lastname: "", email: "", password: "" };
  const [confirmPass, setconfirmPass] = useState("");
  const [data, setData] = useState(initState);
  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleConfirm = (e) => {
    setconfirmPass(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setData({ ...data, error: null });
    fetch("http://localhost:3000/auth/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.email,
        password: data.password,
        firstname: data.firstname,
        lastname: data.lastname,
        location: data.location,
      }),
    })
      .then((res) => {
        console.log(res);
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((resJson) => {
        dispatch({ type: "SIGNUP", payload: resJson });
        console.log(resJson);
      })
      .catch((err) => {
        setData({
          ...data,
          error: err.message || err.statusText,
        });
      });
  };
  return (
    <div className="container d-flex align-items-center vh-100">
      <div className="card col-12 col-md-10 col-lg-6 mx-auto p-5 shadow shadow-lg">
        <Form onSubmit={handleSubmit}>
          <h1 className="text-center">Signup</h1>
          <FormGroup>
            <Label for="firstname">First Name</Label>
            <Input
              type="text"
              name="firstname"
              id="firstname"
              value={data.firstname}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="lastname">Last Name</Label>
            <Input
              type="text"
              name="lastname"
              id="lastname"
              value={data.lastname}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email Id:</Label>
            <Input
              type="email"
              name="email"
              id="email"
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
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="confirmpassword">Confirm Password</Label>
            {confirmPass === data.password ? (
              <Input
                type="password"
                name="confirm"
                id="confirm"
                value={confirmPass}
                onChange={handleConfirm}
                required
              />
            ) : (
              <>
                <Input
                  type="password"
                  name="confirm"
                  id="confirm"
                  value={confirmPass}
                  onChange={handleConfirm}
                  required
                  invalid
                />
                {/* <FormFeedback tooltip>Password does not match!</FormFeedback> */}
                <FormText>Password does not match</FormText>
              </>
            )}
            <div className="mt-5 text-center">
              {confirmPass !== data.password ? (
                <Button
                  color="primary"
                  className="rounded-pill btn btn-lg"
                  outline
                  disabled
                >
                  Sign Up
                </Button>
              ) : (
                <Button
                  color="primary"
                  className="rounded-pill btn btn-lg"
                  outline
                >
                  Sign Up
                </Button>
              )}
            </div>
          </FormGroup>
        </Form>
      </div>
    </div>
  );
};
