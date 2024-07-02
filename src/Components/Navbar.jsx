import {React,useEffect,useState} from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../Components/App.css'
function NavBar() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
    });
  }, []);
  const [expanded, setExpanded] = useState(false);

  const handleNavLinkClick = (href) => {
    setExpanded(false); // Collapse the navbar
    document.querySelector(href).scrollIntoView({ behavior: 'smooth' }); // Scroll to the section
  };

  return (
    <div> 
    <Navbar className='Nav-bg fixed-top bg-glass' variant="dark" expand="lg"  expanded={expanded} onToggle={() => setExpanded(!expanded)}>
      <Container>
        <Navbar.Brand data-aos='fade-in' href="#home" style={{ color: '#FF0000', fontFamily: 'Brush Script MT', fontWeight: 'bold',fontSize:'50px' }}>
          UrbanRider
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className='toggle-btn'/>
        <Navbar.Collapse id="basic-navbar-nav ">
          <Nav className="ms-auto  ">
            <Nav.Link className='nav-hover' data-aos='fade-in' data-delay='200' href="#about" style={{fontWeight:'700' }} onClick={()=>handleNavLinkClick('#about')}>About Me</Nav.Link>
            <Nav.Link  className='nav-hover' data-aos='fade-in' data-delay='400' href="#app" style={{ fontWeight:'700' }} onClick={()=>handleNavLinkClick('#app')}>Go Extra Mile App</Nav.Link>
            <Nav.Link  className='nav-hover' data-aos='fade-in' data-delay='600' href="#business" style={{ fontWeight:'700' }}  onClick={() => handleNavLinkClick('#business')}>For Business</Nav.Link>
            <Nav.Link  className='nav-hover' data-aos='fade-in' data-delay='800' href="#contact" style={{ fontWeight:'700' }}  onClick={() => handleNavLinkClick('#contact')}>Get in touch</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
}

export default NavBar;
