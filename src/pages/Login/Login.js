import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "reactstrap";
import { Button, Form, FormGroup, Label } from "reactstrap";
import { GoogleLogin } from "react-google-login";
import { AuthContext } from "../../App";
import { FcGoogle } from "react-icons/fc";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import styles from "./Login.module.css";
import Particles from "react-tsparticles";

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
  const [showPassword, setShowPassword] = useState(false);
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
        } else {
          setLoading(false);
          setAuthError(true);
          // ErrorToast("Incorrect Credentials!");
        }
        throw res;
      })
      .then((resJson) => {
        // console.log(resJson);
        if (!resJson.user) {
          console.log(resJson);
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
  const particlesInit = (main) => {
    // console.log(main);
  };
  const particlesLoaded = (container) => {
    // console.log(container);
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
      <div className="d-flex container align-items-center">
        <div className={`container col-12 col-md-10 col-lg-6 ${styles.form}`}>
          <Form onSubmit={handleSubmit}>
            <h1 className="text-center m-5">Login</h1>
            <FormGroup>
              {authError && (
                <Alert color="danger">Incorrect username or password!</Alert>
              )}
              <Label for="email" className="fs-4 fw-bold">
                Email
              </Label>
              <input
                className={`col-12 ${styles.inputBox}`}
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
              <Label className="fs-4 fw-bold" for="password">
                Password
              </Label>
              <input
                className={`col-11 ${styles.inputBox}`}
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={data.password}
                onChange={handleInputChange}
                placeholder="Password"
                required
              />
              <Button
                className="col-1"
                style={{ height: "50px" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <BsEye style={{ transform: "scale(1.5)" }} />
                ) : (
                  <BsEyeSlash style={{ transform: "scale(1.5)" }} />
                )}
              </Button>
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
          <hr />
          <div className="d-flex flex-column">
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
                  className="my-4 col-10 col-md-5 mx-auto rounded-pill"
                  color="light"
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
      </div>
    </>
  );
};
