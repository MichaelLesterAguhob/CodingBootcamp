
import { useState } from "react";
import  Container  from "react-bootstrap/Container";
import  Navbar  from "react-bootstrap/NavBar";
import  Nav  from "react-bootstrap/Nav";
import { Link, NavLink } from 'react-router-dom';

export default function AppNavBar() {

    const [user, setUser] = useState(localStorage.getItem("token"));
    return (
        <Navbar expand="lg" className="bg-light">
        <Container className="ms-0">
          <Navbar.Brand as={NavLink} to="/" >Zuitt Booking</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/" exact="true">Home</Nav.Link>
              <Nav.Link as={NavLink} to="/courses" exact="true">Courses</Nav.Link>
              {
                user !== null ?
                  <Nav.Link as={NavLink} to="/logout" exact="true">Logout</Nav.Link>
                  :
                  <>
                      <Nav.Link as={NavLink} to="/login" exact="true">Login</Nav.Link>
                      <Nav.Link as={NavLink} to="/register" exact="true">Register</Nav.Link>
                  </>
              }
            
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}
















