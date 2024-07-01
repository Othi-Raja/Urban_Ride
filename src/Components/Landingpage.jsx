import React from 'react';
import { Container } from 'react-bootstrap'; 
import '../Components/Landingpg.css'
import Navbar from './Navbar';

function LandingPG() {
  return (
  <div className='landing-pg bg-black'>

      <div className="background-image ">
      <Navbar/>
      <Container className="text-center text-overlay ">
        <p className='LP-text1'>Free Fuel Giveaway Everyday.</p>
        <p className='LP-text2'>UrbanRider x Go Extra Mile</p>
      </Container>
    </div>
  </div>
  );
}

export default LandingPG;
