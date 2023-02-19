import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav"
import Services from "./Services";
import {Link, useNavigate} from "react-router-dom";

function Layout({ children }) {

  const navigate = useNavigate();

  //logout handler function
  function userLogout(){
    localStorage.removeItem("token");
    navigate('/')
  }

  return (
    <div>
      <Navbar bg="light" expand="lg">
      <img
            src="https://cdn-icons-png.flaticon.com/512/3209/3209135.png"
            alt="Sample Brand Logo"
            width="40"
            className="align-top d-inline-block"
            height="40"
            loading="lazy"
            style={{marginLeft:"5px"}}
          />
        <Navbar.Brand href="#home" className="m-3 text-success fw-bold">
          D2D HealthCare
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            className="justify-content-end p-2"
            id="basic-navbar-nav">
            <Nav className="ml-auto" >
                  <li><a href="/services" class="text-blue-500 hover:text-blue-800 font-bold py-2 px-4 border border-blue-500 rounded text-decoration-line: none">Services</a></li>
                  <li><a href="/about" class="text-blue-500 hover:text-blue-800 font-bold py-2 px-4 border border-blue-500 rounded text-decoration-line: none">About</a></li>
                  <li><a href="/testimonials" class="text-blue-500 hover:text-blue-800 font-bold py-2 px-4 border border-blue-500 rounded text-decoration-line: none">Testimonials</a></li>

            </Nav>
            <Link to="/" onClick={userLogout} style={{ textDecoration: 'none'}} className="text-red-500">Logout</Link>
          </Navbar.Collapse>
     </Navbar>
    </div>
    // <div className="layout-component" style={{ display: 'block', width: 700, padding: 30 }}>
    //   <Navbar bg="light" expand="lg">
    //     <Navbar.Brand href="#" className="m-3 text-success fw-bold">
    //       D2D HealthCare
    //     </Navbar.Brand>
    //     <img
    //       src="https://cdn-icons-png.flaticon.com/512/3209/3209135.png"
    //       height="40"
    //       width="40"
    //       alt="Logo"
    //       loading="lazy"
    //     />
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     <Navbar.Collapse
    //       id="basic-navbar-nav"
    //       className="justify-content-end p-2"
    //     >
    //       <Nav className="mr-auto">
    //         <Nav.Link href="/services">Services</Nav.Link>
    //         <Nav.Link href="/about">About</Nav.Link>
    //         <Nav.Link href="/testimonials">Testimonials</Nav.Link>
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Navbar>
    //   <Container>
    //     <Row>
    //       <Col>{children}</Col>
    //     </Row>
    //   </Container>
    // </div>
  );
}

export default Layout;
