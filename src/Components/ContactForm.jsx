import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../Components/contact_form.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import app from '../Components/firebaseConfig';
import { getDatabase, ref, set, push } from 'firebase/database';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const field_alert = () => {
  toast.info("Fill all fields", {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "white",
    style: {
      borderRadius: "15px",
      color: "black",
      textAlign: "center",
      margin: '10px',
      fontWeight: "bolder",
      backgroundColor: "white",
      letterSpacing: "1px",
      fontSize: "16px"
    },
  });
};

const notify_error = () => {
  toast.error("Oops! Something went wrong", {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    style: {
      borderRadius: "15px",
      color: "red",
      letterSpacing: "1px",
      fontSize: "16px",
      fontWeight: "bolder",
      backgroundColor: "white"
    },
  });
};

const notify_success = () => {
  toast.success("Submitted Successfully", {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    style: {
      borderRadius: "15px",
      color: "white",
      textAlign: "center",
      margin: '10px',
      fontWeight: "bolder",
      backgroundColor: "black"
    },
  });
};

const ContactForm = () => {
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [details, setDetails] = useState('');

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000, // Animation duration
    });
  }, []);

  const handleMobileNumberChange = (e) => {
    const value = e.target.value;
    const specialCharRegex = /[^0-9]/;

    if (specialCharRegex.test(value)) {
      toast.error('Mobile number should not contain special characters!');
    } else {
      setMobileNumber(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !details || !mobileNumber) {
      field_alert();
      return;
    }

    const db = getDatabase(app);
    const refname = fullName;
    const newProductRef = push(ref(db, refname));

    try {
      await set(newProductRef, {
        time: new Date().toLocaleString(),
        name: fullName,
        email: email,
        mnumber: mobileNumber,
        Umessage: details,
      });
      notify_success();
      // Clear the form fields
      setFullName('');
      setEmail('');
      setMobileNumber('');
      setDetails('');
    } catch (error) {
      console.error("Error adding document: ", error);
      notify_error();
    }
  };

  return (
    <div className="contact-form" id='contact'>
      <Container className="p-4" style={{ backgroundColor: '#282828', borderRadius: '10px' }}>
        <h2 data-aos="fade-in" className="text-center text-white mb-5 pb-2">Get in touch</h2>
        <Form className=' form' onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col xs={12} md={6} lg={4} className="mb-3 mb-md-0">
              <Form.Group controlId="formFullName">
                {/* <Form.Label className="text-white">Full Name</Form.Label> */}
                <Form.Control
                className='p-2 mb-2'
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={6} lg={4} className="mb-3 mb-md-0">
              <Form.Group controlId="formMobileNumber">
                {/* <Form.Label className="text-white">Mobile Number</Form.Label> */}
                <Form.Control
                  className='p-2 mb-2'
                  type="text"
                  placeholder="Mobile Number"
                  value={mobileNumber}
                  onChange={handleMobileNumberChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col xs={12} lg={4}>
              <Form.Group controlId="formEmailAddress">
                {/* <Form.Label className="text-white">Email address</Form.Label> */}
                <Form.Control
                  className='p-2 mb-2'
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="formDetails" className="mb-3">
            {/* <Form.Label className="text-white">Details</Form.Label> */}
            <Form.Control className='p-4 ' 
              as="textarea"
              rows={3}
              placeholder="Details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              required
            />
          </Form.Group>
          <div className="">
            <Button variant="primary" type="submit">Submit</Button>
          </div>
        </Form>
        <ToastContainer />
      </Container>
    </div>
  );
};

export default ContactForm;
