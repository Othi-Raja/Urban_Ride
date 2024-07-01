import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

function navbar() {
  return (
    <Navbar className='Nav-bg' variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home" style={{ color: '#FF0000', fontFamily: 'Brush Script MT', fontWeight: 'bold',fontSize:'50px' }}>
          UrbanRider
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className='toggle-btn'/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#about" style={{ color: 'white',fontWeight:'700' }}>About Me</Nav.Link>
            <Nav.Link href="#app" style={{ color: 'white',fontWeight:'700' }}>Go Extra Mile App</Nav.Link>
            <Nav.Link href="#business" style={{ color: 'white',fontWeight:'700' }}>For Business</Nav.Link>
            <Nav.Link href="#contact" style={{ color: 'white',fontWeight:'700' }}>Get in touch</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default navbar;
