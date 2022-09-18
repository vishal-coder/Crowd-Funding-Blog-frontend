import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LOG_OUT } from "../features/auth/authSlice";
import { logoutUser } from "../services/authService";
import "./css/navbar.css";

function HeaderComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const handleLogout = async () => {
    setIsLoading(true);
    const response = await logoutUser({ username: user.email }, user.token);
    if (!response.success) {
      toast.error("Error while logging out");
    } else {
      navigate("/");
      setIsLoading(false);
      toast.success("User Logged out successfully");
      dispatch(LOG_OUT());
    }
  };
  return (
    <Navbar collapseOnSelect expand="lg" fixed="top" className="sticky-nav">
      <Container>
        <Navbar.Brand>FundME100</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home{" "}
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/posts");
              }}
            >
              Listings
            </Nav.Link>
            {user && user.userType != "admin" ? (
              <>
                <Nav.Link
                  onClick={() => {
                    navigate("/createPost");
                  }}
                >
                  Create
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    navigate("/userView");
                  }}
                >
                  My Posts
                </Nav.Link>
              </>
            ) : null}
            {user && user.userType == "admin" ? (
              <Nav.Link onClick={() => navigate("/dashboard")}>
                Dashboard
              </Nav.Link>
            ) : null}
          </Nav>
          <Nav>
            {!user ? (
              <>
                {" "}
                <Nav.Link
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  Register
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login
                </Nav.Link>{" "}
              </>
            ) : (
              <>
                <Navbar.Text>Welcome, {user.name}</Navbar.Text>
                <Nav.Link
                  onClick={() => {
                    handleLogout();
                  }}
                  disabled={isLoading}
                >
                  {" "}
                  Logout{" "}
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderComponent;
