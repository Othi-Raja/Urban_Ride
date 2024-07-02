import { React, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import '../Components/App.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
export default function Footer() {
    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration
        });
    }, []);
    const date = new Date().getFullYear();
    return (
        <div className='Footer'>
            <Container className='text-center pb-4'>
                <div className='p-4'>
                    <h2 data-aos='fade-in'>Join Me on This Ride</h2>
                    <p data-aos='fade-in'>Thank you for your support! Stay connected, informed, and enjoy the ride. </p>
                    <p data-aos='fade-in'>Follow me on social media, subscribe to updates, and download Go Extra Mile to start <br />
                        earning rewards today. </p>
                    <p data-aos='fade-in'>Let’s ride the future together!</p>
                </div>
                <hr />
                <Row className='justify-content-center text-center'>
                    <Col xs={12} md={4} className="mb-3 mb-md-0">
                        <small><b>{date} &copy; UrbanRider</b></small>
                    </Col>
                    <Col xs={12} md={4} className="mb-3  d-flex align-items-center justify-content-center gap-4">
                       
                    </Col>
                    <Col xs={12} md={4}>
                        <small><b>Terms & Privacy Policy</b></small>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
