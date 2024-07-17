import React, { useEffect, useState } from 'react';
import { Container, Modal, Button, Form } from 'react-bootstrap';
import '../Components/Landingpg.css';
import Navbar from './Navbar';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Admin from './admin/Admin';
import { Routes, Route, useLocation } from 'react-router-dom';
import { collection, getDocs, firestoreDb } from './firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';
const fetchNavItems = async () => {
  try {
    const navCollection = collection(firestoreDb, 'HomePg');
    const navSnapshot = await getDocs(navCollection);
    const navList = navSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return navList;
  } catch (error) {
    console.error("Error fetching nav items:", error);
    return [];
  }
};
const updateNavItem = async (id, updatedItem) => {
  try {
    const itemDoc = doc(firestoreDb, 'HomePg', id);
    await updateDoc(itemDoc, updatedItem);
    console.log('Document updated with ID: ', id);
  } catch (e) {
    console.error('Error updating document: ', e);
  }
};
const isAuthenticated = () => {
  return localStorage.getItem('Auth') === 'true';
};
function LandingPG() {
  const [navItems, setNavItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [pageTxt1, setPageTxt1] = useState('');
  const [pageTxt2, setPageTxt2] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');
  const [newBgImageUrl, setNewBgImageUrl] = useState('');
  useEffect(() => {
    const getNavItems = async () => {
      const items = await fetchNavItems();
      setNavItems(items);
    };
    getNavItems();
  }, []);
  useEffect(() => {
    const getBackgroundImage = async () => {
      try {
        const bgCollection = collection(firestoreDb, 'HomePg');
        const bgSnapshot = await getDocs(bgCollection);
        if (!bgSnapshot.empty) {
          const bgData = bgSnapshot.docs[0].data();
          setBackgroundImage(bgData.BgImg);
        }
      } catch (error) {
        console.error("Error fetching background image:", error);
      }
    };
    getBackgroundImage();
  }, []);
  const handleNavLinkClick = (item) => {
    if (!isAuthenticated()) {
      return;
    }
    setCurrentItem(item);
    setPageTxt1(item.pageTxt1);
    setPageTxt2(item.pageTxt2);
    setBackgroundImage(item.BgImg);
    setShowModal(true);
  };
  const handleModalChange = (e) => {
    const { name, value } = e.target;
    if (name === 'pageTxt1') {
      setPageTxt1(value);
    } else if (name === 'pageTxt2') {
      setPageTxt2(value);
    } else if (name === 'newBgImageUrl') {
      setNewBgImageUrl(value);
    }
  };
  const handleModalSubmit = async () => {
    if (currentItem) {
      const updatedItem = { ...currentItem, pageTxt1, pageTxt2 };
      await updateNavItem(currentItem.id, updatedItem);
      setNavItems(navItems.map(navItem => navItem.id === currentItem.id ? updatedItem : navItem));
      if (newBgImageUrl) {
        try {
          const bgCollection = collection(firestoreDb, 'HomePg');
          const bgSnapshot = await getDocs(bgCollection);
          if (!bgSnapshot.empty) {
            const bgDoc = bgSnapshot.docs[0].id;
            await updateDoc(doc(firestoreDb, 'HomePg', bgDoc), { BgImg: newBgImageUrl });
            setBackgroundImage(newBgImageUrl);
            console.log('Background image updated successfully.');
          }
        } catch (error) {
          console.error('Error updating background image:', error);
        }
      }
      setShowModal(false);
    }
  };
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  const location = useLocation();
  useEffect(() => {
    try {
      if (location.pathname === '/admin') {
        window.open('/Admin', '_blank');
      }
    } catch (error) {
      console.error('Error opening admin page:', error);
    }
  }, [location]);
  let isAuth = isAuthenticated();
  let bgimagehere = backgroundImage;
  return (
    <div>
      {navItems.map((item, index) => (
        <div key={index} className='landing-pg bg-black'>
          <div className="background-image" style={{ background: `url(${bgimagehere})` }}>
            <Navbar />
            <Routes>
              <Route path="/Admin" element={<Admin />} />
            </Routes>
            <Container className="text-center text-overlay">
              <p className='LP-text1 ' id='applyborder' data-aos='fade-in' data-aos-delay='200'>
                {item.pageTxt1}
              </p>
              <p className='LP-text2 ' id='applyborder' data-aos='fade-in' data-aos-delay='300' >
                {item.pageTxt2}
              </p>
              {isAuth && (
                <div className='d-flex justify-content-end'>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className='BguploadCam'
                    width={25}
                    height={25}
                    fill='gray'
                    opacity={0.6}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleNavLinkClick(item)}
                  >
                    <path d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z" />
                  </svg>
                </div>
              )}
            </Container>
          </div>
        </div>
      ))}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Text and Background Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentItem && (
            <Form>
              <Form.Group controlId="formText1">
                <Form.Label>Page Text 1</Form.Label>
                <Form.Control
                  type="text"
                  name="pageTxt1"
                  value={pageTxt1}
                  onChange={handleModalChange}
                />
              </Form.Group>
              <Form.Group controlId="formText2">
                <Form.Label>Page Text 2</Form.Label>
                <Form.Control
                  type="text"
                  name="pageTxt2"
                  value={pageTxt2}
                  onChange={handleModalChange}
                />
              </Form.Group>
              {isAuth && (
                <Form.Group controlId="formBgImage">
                  <Form.Label>New Background Image URL</Form.Label>
                  <Form.Control
                    type="text"
                    name="newBgImageUrl"
                    value={newBgImageUrl}
                    onChange={handleModalChange}
                  />
                </Form.Group>
              )}
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          {isAuth && (
            <Button variant="primary" onClick={handleModalSubmit}>
              Save Changes
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default LandingPG;
