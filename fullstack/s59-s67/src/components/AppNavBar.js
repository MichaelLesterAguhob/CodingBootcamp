import { useContext, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../context/UserContext";

export default function AppNavbar() {

  const { user } = useContext(UserContext);

  // const [user, setUser] = useState(localStorage.getItem("token"));

  return (
    <Navbar expand="lg" className="bg-light">
      <Container className="ms-0">
        <Navbar.Brand as={NavLink} to="/">
          Zuitt Booking
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">

            <Nav.Link as={NavLink} to="/" exact="true">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/courses" exact="true">
              Courses
            </Nav.Link>
            {
                user.isAdmin === true ? 
                <Nav.Link as={NavLink} to="/add-course" exact="true">
                Add Course
                </Nav.Link>
                :
                null
            }
            <Nav.Link as={NavLink} to="/news" exact="true">
              News
            </Nav.Link>
            {
            user.id !== null ? 
              <>
                <Nav.Link as={NavLink} to="/profile" exact="true">
                  Profile
                </Nav.Link>
                <Nav.Link as={NavLink} to="/logout" exact="true">
                  Logout
                </Nav.Link>
              </>
             : 
              <>
                <Nav.Link as={NavLink} to="/login" exact="true">
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register" exact="true">
                  Register
                </Nav.Link>
              </>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
