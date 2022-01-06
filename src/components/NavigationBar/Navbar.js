import React, { useContext, useEffect, useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
} from "reactstrap";
import { AuthContext } from "../../App";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
export const NavigationBar = () => {
  const { state: authState, dispatch } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(authState.user);
    console.log(JSON.parse(authState.user));
  }, []);
  function toggle() {
    setIsOpen(!isOpen);
  }
  const logout = () => {
    setLoading(true);
    fetch("http://localhost:3001/auth/logout", { method: "get" })
      .then((res) => {
        if (res.ok) {
          // console.log(res.json);
          return res.json();
        }
        throw res;
      })
      .then(() => {
        setLoading(false);
        dispatch({ type: "LOGOUT" });
      });
  };
  return (
    <div className="col-12">
      <Navbar expand="md">
        <NavbarBrand href="/">
          <img
            src="https://images.indianexpress.com/2021/01/myntra.png"
            alt=""
            className={`${styles.logo} img-fluid`}
          />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="col-12 justify-content-end" navbar>
            {authState.isAuth ? (
              <>
                <NavItem className="mx-3">
                  <Link to="/home">
                    <Button
                      outline
                      color="dark"
                      className="rounded-pill btn-lg"
                    >
                      Home
                    </Button>
                  </Link>
                </NavItem>
                <NavItem className="mx-3">
                  <Link to={`/profile/${JSON.parse(authState.user)._id}`}>
                    <Button
                      outline
                      color="dark"
                      className="rounded-pill btn-lg"
                    >
                      Your Profile
                    </Button>
                  </Link>
                </NavItem>
                <NavItem className="mx-3">
                  <Link to="/get-better">
                    <Button
                      outline
                      color="dark"
                      className="rounded-pill btn-lg"
                    >
                      Get Better
                    </Button>
                  </Link>
                </NavItem>
                <NavItem className="mx-3">
                  <Link to="/">
                    {loading ? (
                      <Button
                        color="primary"
                        className="rounded-pill btn btn-lg"
                      >
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        <span className="sr-only">Logging out...</span>
                      </Button>
                    ) : (
                      <Button
                        outline
                        color="dark"
                        className="rounded-pill btn-lg"
                        onClick={logout}
                      >
                        Logout
                      </Button>
                    )}
                  </Link>
                </NavItem>
              </>
            ) : (
              <>
                <NavItem className="mx-3">
                  <Link to="/login">
                    <Button
                      outline
                      className="rounded-pill btn-lg"
                      color="primary"
                    >
                      Login
                    </Button>
                  </Link>
                </NavItem>
                <NavItem className="mx-3">
                  <Link to="/signup">
                    <Button className="rounded-pill btn-lg" color="primary">
                      Signup
                    </Button>
                  </Link>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};
