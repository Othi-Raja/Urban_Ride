import {React, useEffect} from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import '../Components/App.css'
import riderImg from '../images/riderImg.png';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function About() {
  // aos animation 
  useEffect(() => {
    AOS.init({
      duration: 1000
    });
  }, []);
  return (
    <div className='top-faded' id='about'>
      <div className='about-Pg'>
        <Container>
          <Row className='text-center pt-5 '>
            <h2 data-aos="fade-in" className='pb-4 mb-4'>About</h2>
          </Row>
          <Row>
            <Col sm={12} md={8} className="About-Paragraph">
              <p data-aos="fade-in">Welcome to My Journey!</p>
              <p data-aos="fade-in">
                Hey there! I’m UrbanRider, your automotive enthusiast dedicated to making every ride an adventure.
                Passionate about bikes, cars, and urban commuting, I explore streets, test vehicles, and share my experiences.
                Whether you're a commuter, traveler, or road thrill-seeker, you’re in the right place.
              </p>
              <b data-aos="fade-in">Who I Am</b>
              <p data-aos="fade-in">
                UrbanRider is more than a name – it's a lifestyle. Fascinated by how bikes and cars transform urban life.
              </p>
              <b data-aos="fade-in">My Mission</b>
              <p data-aos="fade-in">
                As UrbanRider, my mission is to enhance your riding experience and help you make the most out of every mile.
                Through my partnership with Go Extra Mile, I aim to turn your routine commutes into opportunities for earning
                rewards and discovering new adventures.
              </p>
            </Col>
            <Col sm={12} md={4} className='riderimg-center'>
              <img data-aos="fade-in" src={riderImg} alt="rider-img" className="img-fluid rider-img" />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}
