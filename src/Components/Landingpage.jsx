import {React,useEffect }from 'react';
import { Container } from 'react-bootstrap'; 
import '../Components/Landingpg.css'
import Navbar from './Navbar';
import AOS from 'aos';
import 'aos/dist/aos.css';

function LandingPG() {
   // aos animation 
   useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
    });
  }, []);

  return (
  <div className='landing-pg bg-black'>

      <div className="background-image ">
      <Navbar/>
      <Container className="text-center text-overlay ">
        <p className='LP-text1' data-aos='fade-in'  data-aos-delay='200'>Free Fuel Giveaway Everyday.</p>
        <p className='LP-text2' data-aos='fade-in' data-aos-delay='300'>UrbanRider x Go Extra Mile</p>
      </Container>
    </div>
  </div>
  );
}

export default LandingPG;
