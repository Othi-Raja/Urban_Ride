import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../Components/contact_form.css'

const ContactForm = () => {
  return (
    <div className="contact-form">
      <Container className="p-4" style={{ backgroundColor: '#282828', borderRadius: '10px' }}>
        <h2 className="text-center text-white mb-4">Get in touch</h2>
        <Form className='mx-2'>
          <Row className="mb-3">
            <Col xs={12} md={6} lg={4} className="mb-3 mb-md-0">
              <Form.Group controlId="formFullName">
                <Form.Label className="text-white">Full Name*</Form.Label>
                <Form.Control type="text" placeholder="Enter your full name" required />
              </Form.Group>
            </Col>
            <Col xs={12} md={6} lg={4} className="mb-3 mb-md-0">
              <Form.Group controlId="formMobileNumber">
                <Form.Label className="text-white">Mobile Number</Form.Label>
                <Form.Control type="text" placeholder="Enter your mobile number" />
              </Form.Group>
            </Col>
            <Col xs={12} lg={4}>
              <Form.Group controlId="formEmailAddress">
                <Form.Label className="text-white">Email address*</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" required />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="formDetails" className="mb-3">
            <Form.Label className="text-white">Details</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Enter details" />
          </Form.Group>
          <div >
            <Button variant="primary" type="submit">Submit</Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default ContactForm;
