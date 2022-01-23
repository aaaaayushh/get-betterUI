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
import { GiHamburgerMenu, GiProgression } from "react-icons/gi";
import { FiLogOut } from "react-icons/fi";
import { AuthContext } from "../../App";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import FindFriends from "../findFriends/FindFriends";
import { AiFillMessage } from "react-icons/ai";
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
    <div className="col-12" style={{ position: "sticky", top: 0, zIndex: "1" }}>
      <Navbar expand="lg" className={`${styles.navbar}`}>
        <NavbarBrand href="/">
          <img
            src="https://images.indianexpress.com/2021/01/myntra.png"
            alt=""
            className={`${styles.logo} img-fluid`}
          />
        </NavbarBrand>
        <NavbarToggler
          onClick={toggle}
          className={`${styles["navbarToggler"]}`}
        >
          <GiHamburgerMenu />
        </NavbarToggler>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="col-12 justify-content-end" navbar>
            {authState.isAuth ? (
              <>
                <div className="d-block d-lg-none">
                  <FindFriends />
                </div>
                <NavItem className="mx-3">
                  <Link to="/home">
                    <Button
                      outline
                      color="light"
                      className="rounded-pill btn-lg border-0 border-lg-3"
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
                      className="rounded-pill btn-lg border-0 border-lg-3"
                    >
                      <IoPersonSharp className="mb-1 mx-1" />
                      Your Profile
                    </Button>
                  </Link>
                </NavItem>
                <NavItem className="mx-3 d-inline d-lg-none">
                  <Link to="/inbox">
                    <Button
                      outline
                      color="light"
                      className="rounded-pill btn-lg border-0 border-lg-3"
                    >
                      <AiFillMessage className="mb-1 mx-1" />
                      Inbox
                    </Button>
                  </Link>
                </NavItem>
                <NavItem className="mx-3">
                  <Link to="/get-better">
                    <Button
                      outline
                      color="light"
                      className="rounded-pill btn-lg border-0 border-lg-3"
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
                        className="rounded-pill btn btn-lg border-0 border-lg-3"
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
                        className="rounded-pill btn-lg border-0 border-lg-3"
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
                      className="rounded-pill btn-lg border-0 border-lg-3"
                      color="light"
                    >
                      Login
                    </Button>
                  </Link>
                </NavItem>
                <NavItem className="mx-3">
                  <Link to="/signup">
                    <Button
                      className="rounded-pill btn-lg border-0 border-lg-3"
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
