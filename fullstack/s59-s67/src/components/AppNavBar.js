import  Container  from "react-bootstrap/Container";
import  Navbar  from "react-bootstrap/NavBar";
import  Nav  from "react-bootstrap/Nav";

export default function AppNavBar() {
    return (
        <Navbar expand="lg" className="bg-light">
        <Container className="ms-0">
          <Navbar.Brand href="#home">Zuitt Booking</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Courses</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}
















