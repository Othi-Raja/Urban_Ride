import React, { useEffect, useState, useCallback } from 'react';
import { Container, Row, Col, Modal, Button, Form } from 'react-bootstrap';
import '../Components/App.css';
import riderImg from '../images/riderImg.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.core.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import ReactQuill from 'react-quill';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { firestoreDb } from './firebaseConfig';

const fetchAboutContent = async () => {
  try {
    const navCollection = collection(firestoreDb, 'About');
    const navSnapshot = await getDocs(navCollection);
    const navList = navSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return navList;
  } catch (error) {
    console.error("Error fetching nav items:", error);
    return [];
  }
};

const updateAboutItem = async (id, updatedItem) => {
  try {
    const itemDoc = doc(firestoreDb, 'About', id);
    await updateDoc(itemDoc, updatedItem);
    console.log('Document updated with ID: ', id);
  } catch (e) {
    console.error('Error updating document: ', e);
  }
};

const isAuthenticated = () => {
  return localStorage.getItem('Auth') === 'true';
};

const About = () => {
  const [aboutItems, setAboutItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalField, setModalField] = useState('');
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');

  const getAboutItems = useCallback(async () => {
    const items = await fetchAboutContent();
    setAboutItems(items);
  }, []);

  useEffect(() => {
    getAboutItems();
  }, [getAboutItems]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const editAboutContent = (item, field) => {
    if (!isAuthenticated()) {
      return;
    }
    setModalContent(item[field]);
    setModalField(field);
    setSelectedItemId(item.id);
    setShowModal(true);
  };

  const handleSaveContent = async () => {
    if (!modalField || !modalContent || !selectedItemId) {
      console.error('Error: Modal field, content, or selected item ID is empty.');
      return;
    }
    const updatedItem = {
      ...aboutItems.find(item => item.id === selectedItemId),
      [modalField]: modalContent
    };
    await updateAboutItem(updatedItem.id, updatedItem);
    setAboutItems(prevItems =>
      prevItems.map(item => (item.id === updatedItem.id ? updatedItem : item))
    );
    setShowModal(false);
  };

  const handleUploadClick = () => {
    setShowImageModal(true);
  };

  const handleSaveImageUrl = async () => {
    try {
      const itemDoc = doc(firestoreDb, 'About', 'aboutCon'); // Replace 'aboutCon' with your actual document ID
      await updateDoc(itemDoc, { AboutProfileImage: newImageUrl });
      console.log('AboutProfileImage updated successfully.');
      setShowImageModal(false); // Close the modal after successful update
    } catch (error) {
      console.error('Error updating AboutProfileImage:', error);
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'header': '3' }, { 'font': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline'],
      ['link'],
      [{ 'align': '' }, { 'align': 'center' }, { 'align': 'right' }, { 'align': 'justify' }],
      [{ 'color': [] }, { 'background': [] }],
      ['clean']
    ],
    clipboard: {
      matchVisual: false,
    }
  };

  const formats = [
    'header',
    'font',
    'list',
    'bullet',
    'bold',
    'italic',
    'underline',
    'link',
    'align',
    'color',
    'background'
  ];

  const isAuth = isAuthenticated();

  return (
    <div>
      {aboutItems.map((item, index) => (
        <div key={index} className="top-faded pt-5" id='about'>
          <div className="about-Pg">
            <Container>
              <Row className="text-center pt-5">
                <h2 data-aos="fade-in" className="pb-4 mb-4" onClick={() => editAboutContent(item, 'AbTitle')}>
                  {item.AbTitle}
                </h2>
              </Row>
              <Row>
                <Col sm={12} md={8} className="About-Paragraph">
                  <div
                    data-aos="fade-in"
                    dangerouslySetInnerHTML={{ __html: item.AbPara1 }}
                  />
                  {isAuth && (
                    <Button className='edit-Icon' size="sm" onClick={() => editAboutContent(item, 'AbPara1')}>
                      <FontAwesomeIcon icon={faPen} />
                    </Button>
                  )}
                </Col>
                <Col sm={12} md={4} className="riderimg-center d-block">
                  <img data-aos="fade-in" src={item.AboutProfileImage} alt="rider-img" className="img-fluid rider-img" />
                  {isAuth && (
                    <div className='d-flex justify-content-end'>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className='uploadCam'
                        width={25}
                        height={25}
                        fill='gray'
                        opacity={0.6}
                        onClick={handleUploadClick}
                        style={{ cursor: 'pointer' }}
                      >
                        <path d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z" />
                      </svg>
                    </div>
                  )}
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      ))}
      {/* Content Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Content</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactQuill
            value={modalContent}
            onChange={setModalContent}
            modules={modules}
            formats={formats}
            placeholder="Edit content..."
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveContent}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Image Upload Modal */}
      <Modal show={showImageModal} onHide={() => setShowImageModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="Enter image URL"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowImageModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveImageUrl}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default About;
