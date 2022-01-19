import React, { useContext, useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
} from "reactstrap";
import { ImHome } from "react-icons/im";
import { IoPersonSharp } from "react-icons/io5";
import { GiProgression } from "react-icons/gi";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { AuthContext } from "../../App";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
export const NavigationBar = () => {
  const { state: authState, dispatch } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   console.log(authState.user);
  //   console.log(JSON.parse(authState.user));
  // }, []);
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
      <Navbar expand="md" className={`${styles.navbar}`}>
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
                      color="light"
                      className="rounded-pill btn-lg border-3"
                    >
                      <ImHome className="mx-2 mb-1" />
                      Home
                    </Button>
                  </Link>
                </NavItem>
                <NavItem className="mx-3">
                  <Link to={`/profile/${JSON.parse(authState.user)._id}`}>
                    <Button
                      outline
                      color="light"
                      className="rounded-pill btn-lg border-3"
                    >
                      <IoPersonSharp className="mb-1 mx-1" />
                      Your Profile
                    </Button>
                  </Link>
                </NavItem>
                <NavItem className="mx-3">
                  <Link to="/get-better">
                    <Button
                      outline
                      color="light"
                      className="rounded-pill btn-lg border-3"
                    >
                      <GiProgression className="mb-2 mx-1" />
                      Get Better
                    </Button>
                  </Link>
                </NavItem>
                <NavItem className="mx-3">
                  <Link to="/">
                    {loading ? (
                      <Button
                        color="primary"
                        className="rounded-pill btn btn-lg border-3"
                      >
                        <FiLogOut className="mx-2" />
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
                        color="light"
                        className="rounded-pill btn-lg border-3"
                        onClick={logout}
                      >
                        <FiLogOut className="mx-2" />
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
                      className="rounded-pill btn-lg border-3"
                      color="light"
                    >
                      <FiLogIn className="mx-1 mb-1" />
                      Login
                    </Button>
                  </Link>
                </NavItem>
                <NavItem className="mx-3">
                  <Link to="/signup">
                    <Button
                      className="rounded-pill btn-lg border-3"
                      outline
                      color="light"
                    >
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
