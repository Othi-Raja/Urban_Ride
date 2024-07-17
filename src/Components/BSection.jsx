import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faLink } from '@fortawesome/free-solid-svg-icons';
import { doc, getDoc, updateDoc } from 'firebase/firestore';  
import { firestoreDb } from './firebaseConfig';  
const BSection = () => {
  const [textContent, setTextContent] = useState('');
  const [logos, setLogos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const docRef = doc(firestoreDb, 'MyApp', 'App'); 
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data().Business;
          setTextContent(data.TextContent || '');
          setLogos(data.Logos || []);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching document: ', error);
      }
    }
    fetchData();
  }, []);
  const handleSave = async () => {
    try {
      const docRef = doc(firestoreDb, 'MyApp', 'App');  
      await updateDoc(docRef, {
        'Business.TextContent': textContent,
        'Business.Logos': logos
      });
      setShowModal(false);
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };
  const handleAddLogo = () => {
    const newLogo = { logo: '', website: '' };
    setLogos([...logos, newLogo]);
  };
  const handleDeleteLogo = async (index) => {
    try {
      const updatedLogos = logos.filter((logo, idx) => idx !== index);
      const docRef = doc(firestoreDb, 'MyApp', 'App');  
      await updateDoc(docRef, {
        'Business.Logos': updatedLogos
      });
      setLogos(updatedLogos);
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };
  const isAuthenticated = () => localStorage.getItem('Auth') === 'true';
  const isAuth = isAuthenticated();
  const handleLogoChange = (index, field, value) => {
    const updatedLogos = [...logos];
    updatedLogos[index][field] = value;
    setLogos(updatedLogos);
  };
  return (
    <div className='GeXApp' id='business'>
      <Container>
        <Col>
          <Row className='w-100 text-center brands-list pt-5 mt-5 d-flex align-items-center justify-content-center brands-logo'>
            <div className='bussnesscontent' dangerouslySetInnerHTML={{ __html: textContent }} />
          </Row>
          <Row className="justify-content-center w-100 m-auto">
            {logos.map((logo, index) => (
              <Col key={index} xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center align-items-center mb-3" id='contact'>
                <a href={logo.website} target="_blank" rel="noopener noreferrer" className="d-flex justify-content-center align-items-center">
                  <img
                    src={logo.logo}
                    alt={`Logo ${index}`}
                    className='brandlogos'
                  />
                </a>
                {isAuth && (
                  <Button size="sm" onClick={() => handleDeleteLogo(index)} className="ml-2 trashicon"><FontAwesomeIcon icon={faTrash} /></Button>
                )}
              </Col>
            ))}
          </Row>
          {isAuth && (
            <Button onClick={() => setShowModal(true)} className='edit-Icon'><FontAwesomeIcon icon={faPen} /></Button>
          )}
        </Col>
      </Container>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Text Content and Logos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactQuill
            value={textContent}
            onChange={setTextContent}
            theme="snow"
            modules={{
              toolbar: [
                [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['bold', 'italic', 'underline'],
                ['link'],
                ['clean']
              ]
            }}
          />
          <hr />
          <h5>Manage Content:</h5>
          {logos.map((logo, index) => (
            <Form.Group key={index}>
              <Form.Label>Brand URL:</Form.Label>
              <Form.Control
                type="text"
                value={logo.logo}
                onChange={(e) => handleLogoChange(index, 'logo', e.target.value)}
              />
              <Form.Label>Site <FontAwesomeIcon icon={faLink} color='grey' width={18}/></Form.Label>
              <Form.Control
                type="text"
                value={logo.website}
                onChange={(e) => handleLogoChange(index, 'website', e.target.value)}
              />
            </Form.Group>
          ))}
          <Button variant="primary" onClick={handleAddLogo} className='mt-3'>
            Add Logo
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default BSection;
