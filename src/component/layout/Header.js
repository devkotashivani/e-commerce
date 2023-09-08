import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import Register from '../../pages/auth/Register';
import {RiLoginCircleLine} from "react-icons/ri"
import {RiLogoutCircleLine} from "react-icons/ri"

function Header() {
  return (
    <div>
      <Navbar expand="lg" variant='dark' className="bg-dark">
      <Container>
        <Navbar.Brand href="/">E-Commerce</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          <Link className='nav-link' to="/login"><RiLoginCircleLine className='me-2'/>Login</Link>
            <Link className='nav-link' to="/"><RiLogoutCircleLine className='me-2'/>Logout</Link>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Header
