import React, { useContext, useState } from "react";
import { Button, Alert, Form, FormText, FormGroup, Label } from "reactstrap";
import Particles from "react-tsparticles";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { AuthContext } from "../../App";
import { FcGoogle } from "react-icons/fc";
import styles from "./Signup.module.css";
import { BsEye, BsEyeSlash } from "react-icons/bs";

export const Signup = () => {
  const { dispatch } = useContext(AuthContext);
  const initState = { firstname: "", lastname: "", email: "", password: "" };
  const [confirmPass, setconfirmPass] = useState("");
  const [data, setData] = useState(initState);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [showPassword, setShowPassword] = useState([false, false]);
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
        googleId: res.profileObj.googleId,
        profilePic: res.profileObj.imageUrl,
      }),
    }).then((res) => {
      // console.log(res);
      // console.log("here");
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
          })
            .then((res) => {
              // console.log(res);
              return res.json();
            })
            .then((resJson) => {
              dispatch({ type: "SIGNUP", payload: resJson });
            });
          setLoading(false);
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
  const particlesInit = (main) => {
    console.log(main);
  };
  const particlesLoaded = (container) => {
    console.log(container);
  };
  return (
    <>
      <div>
        <Particles
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            background: {
              color: {
                value: "#000000",
              },
              position: "50% 50%",
              repeat: "no-repeat",
              size: "cover",
            },
            fullScreen: {
              zIndex: -1,
            },
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onDiv: {
                  selectors: "#repulse-div",
                  mode: "repulse",
                },
                onHover: {
                  enable: true,
                  mode: "connect",
                  parallax: {
                    force: 60,
                  },
                },
              },
              modes: {
                bubble: {
                  distance: 400,
                  duration: 2,
                  opacity: 0.8,
                  size: 40,
                },
                grab: {
                  distance: 400,
                },
              },
            },
            particles: {
              color: {
                value: "random",
              },
              links: {
                color: {
                  value: "#ffffff",
                },
                distance: 150,
                opacity: 0.4,
              },
              move: {
                attract: {
                  rotate: {
                    x: 600,
                    y: 1200,
                  },
                },
                enable: true,
                outModes: {
                  bottom: "out",
                  left: "out",
                  right: "out",
                  top: "out",
                },
                speed: 6,
              },
              number: {
                density: {
                  enable: true,
                },
                limit: 500,
                value: 300,
              },
              opacity: {
                value: 0.5,
                animation: {
                  speed: 1,
                  minimumValue: 0.1,
                },
              },
              size: {
                random: {
                  enable: true,
                },
                value: {
                  min: 1,
                  max: 5,
                },
                animation: {
                  speed: 40,
                  minimumValue: 0.1,
                },
              },
            },
          }}
        />
      </div>
      <div className="container d-flex align-items-center">
        <div
          className={`col-12 col-md-10 col-lg-6 mx-auto container px-5 ${styles.form}`}
        >
          <Form onSubmit={handleSubmit}>
            <h1 className="text-center mt-3">Signup</h1>
            <FormGroup>
              {authError && (
                <Alert color="danger">Email Id is already registered!</Alert>
              )}
              <Label for="firstname" className="fs-5 fw-bold">
                First Name
              </Label>
              <input
                className={`col-12 ${styles.inputBox}`}
                type="text"
                name="firstname"
                id="firstname"
                value={data.firstname}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label className="fs-5 fw-bold" for="lastname">
                Last Name
              </Label>
              <input
                className={`col-12 ${styles.inputBox}`}
                type="text"
                name="lastname"
                id="lastname"
                value={data.lastname}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="email" className="fs-5 fw-bold">
                Email Id:
              </Label>
              <input
                className={`col-12 ${styles.inputBox}`}
                type="email"
                name="email"
                id="email"
                value={data.email}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="password" className="fs-5 fw-bold">
                Password
              </Label>
              <input
                className={`col-11 ${styles.inputBox}`}
                type={showPassword[0] ? "text" : "password"}
                name="password"
                id="password"
                value={data.password}
                onChange={handleInputChange}
                required
              />
              <Button
                className="col-1"
                style={{ height: "50px" }}
                onClick={() =>
                  setShowPassword([!showPassword[0], showPassword[1]])
                }
              >
                {showPassword[0] ? (
                  <BsEye style={{ transform: "scale(1.5)" }} />
                ) : (
                  <BsEyeSlash style={{ transform: "scale(1.5)" }} />
                )}
              </Button>
            </FormGroup>
            <FormGroup>
              <Label className="fs-5 fw-bold" for="confirmpassword">
                Confirm Password
              </Label>
              <input
                className={`col-11 ${styles.inputBox}`}
                type={showPassword[1] ? "text" : "password"}
                name="confirm"
                id="confirm"
                value={confirmPass}
                onChange={handleConfirm}
                required
              />
              <Button
                className="col-1"
                style={{ height: "50px" }}
                onClick={() =>
                  setShowPassword([showPassword[0], !showPassword[1]])
                }
              >
                {showPassword[1] ? (
                  <BsEye style={{ transform: "scale(1.5)" }} />
                ) : (
                  <BsEyeSlash style={{ transform: "scale(1.5)" }} />
                )}
              </Button>
              {confirmPass !== data.password && (
                <FormText>Password does not match</FormText>
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
    </>
  );
};
