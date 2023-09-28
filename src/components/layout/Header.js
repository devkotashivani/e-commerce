import { signOut } from "firebase/auth";
import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../../firebase-config";
import { setUser } from "../../redux/auth/userSlice";
function Header() {
  const { user } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  const handleOnLogout = () => {
    signOut(auth).then(() => {
      console.log("User has been logged out from firebase auth");
      // clear the storage of redux
      dispatch(setUser({}));
    });
  };
  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Tech CMS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user?.uid ? (
              <Link className="nav-link" to="#!" onClick={handleOnLogout}>
                <BiLogOut /> Log-Out
              </Link>
            ) : (
              <Link className="nav-link" to="/">
                <BiLogIn />
                Login
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
