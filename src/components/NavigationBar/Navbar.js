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
              <NavLink href="/">
                <Button outline className="rounded-pill">
                  Home
                </Button>
              </NavLink>
            </NavItem>
            {authState.isAuth ? (
              <>
                <NavItem>
                  <NavLink href="/profile">
                    <Button outline className="rounded-pill">
                      Your Profile
                    </Button>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/">
                    <Button outline className="rounded-pill" onClick={logout}>
                      Logout
                    </Button>
                  </NavLink>
                </NavItem>
              </>
            ) : (
              <>
                <NavItem>
                  <NavLink href="/login">
                    <Button outline className="rounded-pill">
                      Login
                    </Button>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/signup">
                    <Button outline className="rounded-pill">
                      Signup
                    </Button>
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};
