import React from "react";
import { Search } from "react-bootstrap-icons";
import "./css/navbar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function HeaderComponent() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand href="#home">FundME</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Home </Nav.Link>
            <Nav.Link href="#pricing">Listings</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">Register</Nav.Link>
            <Nav.Link>Login</Nav.Link>
            <Nav.Link>Logout </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderComponent;
