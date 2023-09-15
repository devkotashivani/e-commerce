import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { RiLoginCircleLine } from "react-icons/ri";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "@firebase/auth";
import { auth } from "../../firebaseConfig/config";
import { setUser } from "../../redux/auth/UserSlice";

function Header() {
  const { user } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();

  const handleOnLogout = () => {
    signOut(auth).then(() => {
      // clear the stored data from store
      dispatch(setUser({}));
    });
  };
  return (
    <div>
      <Navbar expand="lg" variant="dark" className="bg-dark">
        <Container>
          <Navbar.Brand href="/">E-Commerce</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {/* if user is logged in show logout */}
              {user?.uid ? (
                <Link className="nav-link" to="/" onClick={handleOnLogout}>
                  <RiLogoutCircleLine className="me-2" />
                  Logout
                </Link>
              ) : (
                <Link className="nav-link" to="/">
                  <RiLoginCircleLine className="me-2" />
                  Login
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
