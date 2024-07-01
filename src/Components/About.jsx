import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import '../Components/App.css'
import riderImg from '../images/riderImg.png'
export default function About() {
    return (
        <div className='top-faded'>
            <div className='about-Pg'>
                <Container>
                    <Row className='text-center pt-5 pb-5'>
                        <h2>About</h2>
                    </Row>
                    <Row>
                    <Col sm={12} md={8} className="About-Paragraph">
          <p>Welcome to My Journey!</p>
          <p>
            Hey there! I’m UrbanRider, your automotive enthusiast dedicated to making every ride an adventure.
            Passionate about bikes, cars, and urban commuting, I explore streets, test vehicles, and share my experiences.
            Whether you're a commuter, traveler, or road thrill-seeker, you’re in the right place.
          </p>
          <b>Who I Am</b>
          <p>
            UrbanRider is more than a name – it's a lifestyle. Fascinated by how bikes and cars transform urban life.
          </p>
          <b>My Mission</b>
          <p>
            As UrbanRider, my mission is to enhance your riding experience and help you make the most out of every mile.
            Through my partnership with Go Extra Mile, I aim to turn your routine commutes into opportunities for earning
            rewards and discovering new adventures.
          </p>
        </Col>
        <Col sm={12} md={4} className='riderimg-center'>
          <img src={riderImg} alt="rider-img" className="img-fluid rider-img" />
        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}
