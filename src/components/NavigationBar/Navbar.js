import React, { useContext, useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
} from "reactstrap";
import { AuthContext } from "../../App";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
export const NavigationBar = () => {
  const { dispatch } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const { state: authState } = useContext(AuthContext);
  function toggle() {
    setIsOpen(!isOpen);
  }
  const logout = () => {
    fetch("http://localhost:3000/auth/logout", { method: "get" })
      .then((res) => {
        if (res.ok) {
          console.log(res.json);
          return res.json();
        }
        throw res;
      })
      .then(() => {
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
            <NavItem>
              <Link to="/">
                <Button outline className="rounded-pill">
                  Home
                </Button>
              </Link>
            </NavItem>
            {authState.isAuth ? (
              <>
                <NavItem>
                  <Link to="/profile">
                    <Button outline className="rounded-pill">
                      Your Profile
                    </Button>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="/get-better">
                    <Button outline className="rounded-pill">
                      Get Better
                    </Button>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="/">
                    <Button outline className="rounded-pill" onClick={logout}>
                      Logout
                    </Button>
                  </Link>
                </NavItem>
              </>
            ) : (
              <>
                <NavItem>
                  <Link to="/login">
                    <Button outline className="rounded-pill">
                      Login
                    </Button>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="/signup">
                    <Button outline className="rounded-pill">
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
