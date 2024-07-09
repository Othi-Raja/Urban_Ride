import { React, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import '../Components/Landingpg.css'
import Navbar from './Navbar';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Admin from './admin/Admin'
import { Routes, Route, useLocation } from 'react-router-dom';
function LandingPG() {
  // aos animation 
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
    });
  }, []);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/admin') {
      window.open('/Admin', '_blank');
    }
  }, [location]);
  return (
    <div className='landing-pg bg-black'>
      <div className="background-image ">
        <Navbar />
        <Routes>
          <Route path="/Admin" element={<Admin />} />
        </Routes>
        <Container className="text-center text-overlay ">
          <p className='LP-text1' data-aos='fade-in' data-aos-delay='200'>Free Fuel Giveaway Everyday.</p>
          <p className='LP-text2' data-aos='fade-in' data-aos-delay='300'>UrbanRider x Go Extra Mile</p>
        </Container>
      </div>
    </div>
  );
}
export default LandingPG;
