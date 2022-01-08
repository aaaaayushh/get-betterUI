import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "reactstrap";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { GoogleLogin } from "react-google-login";
import { AuthContext } from "../../App";
import { FcGoogle } from "react-icons/fc";

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
  const [loading, setLoading] = useState(false);
  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const onSuccess = async (res) => {
    console.log(res);
    fetch("http://localhost:3001/auth/googlelogin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: res.profileObj.email,
        firstname: res.profileObj.givenName,
        lastname: res.profileObj.familyName,
        googleId: res.profileObj.googleId,
        profilePic: res.profileObj.imageUrl,
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
        const user = { ...res.profileObj, _id: resJson._id };
        console.log(user);
        dispatch({
          type: "LOGIN",
          payload: { user, token: res.tokenId },
        });
      });

    navigate("/");
  };
  const onFailure = (err) => {
    console.log(err, "login failed");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setData({ ...data, error: null });

    fetch("http://localhost:3001/auth/login", {
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
        // console.log(resJson);
        if (!resJson.user) {
          setAuthError(true);
          setLoading(false);
          return;
        } else {
          setLoading(false);
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
    <div className="d-flex container align-items-center ">
      <div className="card col-12 col-md-10 col-lg-6 mx-auto shadow shadow-lg">
        <div className="container">
          <Form onSubmit={handleSubmit} className="m-3">
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
              {loading ? (
                <Button color="primary" className="rounded-pill btn btn-lg">
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Logging in...</span>
                </Button>
              ) : (
                <Button color="primary" className="rounded-pill btn btn-lg">
                  Login
                </Button>
              )}
            </div>
          </Form>
        </div>
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
              Login with Google
            </Button>
          )}
        />
        <small className="mx-auto my-3">
          <strong>
            Don't have an account?{" "}
            <a className="link" href="/signup">
              Sign Up
            </a>
          </strong>
        </small>
      </div>
    </div>
  );
};
