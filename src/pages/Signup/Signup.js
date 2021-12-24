import React, { useContext, useState } from "react";
import {
  Button,
  Alert,
  Form,
  FormText,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { AuthContext } from "../../App";
import { FcGoogle } from "react-icons/fc";

export const Signup = () => {
  const { dispatch } = useContext(AuthContext);
  const initState = { firstname: "", lastname: "", email: "", password: "" };
  const [confirmPass, setconfirmPass] = useState("");
  const [data, setData] = useState(initState);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleConfirm = (e) => {
    setconfirmPass(e.target.value);
  };
  const onSuccess = async (res) => {
    fetch("http://localhost:3001/auth/googleSignup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: res.profileObj.email,
        firstname: res.profileObj.givenName,
        lastname: res.profileObj.familyName,
      }),
    }).then((res) => {
      console.log(res);
      console.log("here");
    });
    dispatch({
      type: "SIGNUP",
      payload: { user: res.profileObj, token: res.tokenId },
    });
    navigate("/");
  };
  const onFailure = (err) => {
    console.log(err, "signup failed");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setData({ ...data, error: null });
    fetch("http://localhost:3001/auth/signup", {
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
        if (resJson.errors) {
          setAuthError(true);
          setLoading(false);
        } else {
          fetch("http://localhost:3001/auth/signupInfo", {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: data.email,
              firstname: data.firstname,
              lastname: data.lastname,
            }),
          });
          dispatch({ type: "SIGNUP", payload: resJson });
          setLoading(false);
          navigate("/");
          console.log(resJson);
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
    <div className="container d-flex align-items-center">
      <div className="card col-12 col-md-10 col-lg-6 mx-auto p-5 shadow shadow-lg">
        <Form onSubmit={handleSubmit}>
          <h1 className="text-center">Signup</h1>
          <FormGroup>
            {authError && (
              <Alert color="danger">Email Id is already registered!</Alert>
            )}
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
                <FormText>Password does not match</FormText>
              </>
            )}
            <div className="mt-5 text-center">
              {loading ? (
                <Button color="primary" className="rounded-pill btn btn-lg">
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Signing you up...</span>
                </Button>
              ) : confirmPass !== data.password ? (
                <Button
                  color="primary"
                  className="rounded-pill btn btn-lg"
                  outline
                  disabled
                >
                  Sign Up
                </Button>
              ) : (
                <Button color="primary" className="rounded-pill btn btn-lg">
                  Sign Up
                </Button>
              )}
              <hr />
              <GoogleLogin
                clientId={
                  "124435339268-1ga1pq3hmku8pcfgqrs6bnka86cv6v9r.apps.googleusercontent.com"
                }
                buttonText="Login with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={"single_host_origin"}
                render={(renderProps) => (
                  <Button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className="my-4 col-5 mx-auto rounded-pill"
                    color="primary"
                    outline
                  >
                    <FcGoogle
                      className="me-3 mb-1"
                      style={{ transform: "scale(1.5)" }}
                    />
                    Signup with Google
                  </Button>
                )}
              />
            </div>
            <small className="d-flex justify-content-center my-3">
              <strong>
                Already have an account?{" "}
                <a className="link" href="/login">
                  Log In
                </a>
              </strong>
            </small>
          </FormGroup>
        </Form>
      </div>
    </div>
  );
};
