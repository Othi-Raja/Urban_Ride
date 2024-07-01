import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import '../Components/App.css'
export default function Footer() {
    const date = new Date().getFullYear();

    return (
        <div className='Footer'>
            <Container className='text-center'>
                <div className='p-4'>
                    <h2>Join Me on This Ride</h2>
                    <p>Thank you for your support! Stay connected, informed, and enjoy the ride. </p>
                    <p>Follow me on social media, subscribe to updates, and download Go Extra Mile to start <br />
                        earning rewards today. </p>
                    <p>Let’s ride the future together!</p>
                </div>
                <hr />
                <Row className='justify-content-center text-center'>
                    <Col xs={12} md={4} className="mb-3 mb-md-0">
                        <small><b>{date} &copy;UrbanRider</b></small>
                    </Col>
                    <Col xs={12} md={4} className="mb-3 mb-md-0">
                        
                    </Col>
                    <Col xs={12} md={4}>
                        <small><b>Terms & Privacy Policy</b></small>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
