import { React, useEffect, useState } from 'react';
import { Navbar, Nav, Container, Modal, Button, Form } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../Components/App.css';
import { useLocation } from 'react-router-dom';
import { collection, getDocs, firestoreDb } from './firebaseConfig'; // Adjust the import path as necessary
import { doc, updateDoc } from 'firebase/firestore'; // Import updateDoc
const fetchNavItems = async () => {
  try {
    const navCollection = collection(firestoreDb, 'NavItem');  
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
    const itemDoc = doc(firestoreDb, 'NavItem', id);
    await updateDoc(itemDoc, updatedItem);
    console.log('Document updated with ID: ', id);
  } catch (e) {
    console.error('Error updating document: ', e);
  }
};
const isAuthenticated = () => {
  return localStorage.getItem('Auth') === 'true';
};
const NavBar = () => {
  const [navItems, setNavItems] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
    });
    const getNavItems = async () => {
      const items = await fetchNavItems();
      setNavItems(items);
    };
    getNavItems();
  }, []); // Empty dependency array ensures this effect runs only once
  const handleNavLinkClick = (item) => {
    if (!isAuthenticated()) {
      return;
    }
    setCurrentItem(item);
    setShowModal(true);
  };
  const handleModalChange = (field, value) => {
    setCurrentItem({ ...currentItem, [field]: value });
  };
  const handleModalSubmit = async () => {
    if (currentItem) {
      await updateNavItem(currentItem.id, currentItem);
      setNavItems(navItems.map(navItem => navItem.id === currentItem.id ? currentItem : navItem));
      setShowModal(false);
    }
  };
  const location = useLocation();
  const useRouteruthDenide = () => {
    useEffect(() => {
      if (location.pathname === '/') {
        localStorage.clear();
      }
    });
  }
  useRouteruthDenide();
  return (
    <div>
      <Navbar className='Nav-bg fixed-top bg-glass' variant="dark" expand="lg" expanded={expanded} onToggle={() => setExpanded(!expanded)}>
        <>
          {navItems.map((item, index) => (
            <Container key={index}>
              <Navbar.Brand data-aos='fade-in' href="#home" className='urban-logo' onClick={(e) => handleNavLinkClick(item,e)} style={{ color: '#FF0000', fontSize: '40px' }}>
                {item.logo}
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" className='toggle-btn' />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                  <Nav.Link
                    className='nav-hover'
                    href='#about'
                    style={{ fontWeight: '700' }}
                    onClick={(e) => handleNavLinkClick(item)}
                  >
                    {item.navItem1}
                  </Nav.Link>
                  <Nav.Link
                    className='nav-hover'
                    href="#app"
                    style={{ fontWeight: '700' }}
                    onClick={(e) => handleNavLinkClick(item,e)}
                  >
                    {item.navItem2}
                  </Nav.Link>
                  <Nav.Link
                    className='nav-hover'
                    href="#business"
                    style={{ fontWeight: '700' }}
                    onClick={(e) => handleNavLinkClick(item,e)}
                  >
                    {item.navItem3}
                  </Nav.Link>
                  <Nav.Link
                    className='nav-hover'
                    href="#contact"
                    style={{ fontWeight: '700' }}
                    onClick={(e) => handleNavLinkClick(item,e)}
                  >
                    {item.navItem4}
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse> 
            </Container>
          ))}
        </>
      </Navbar>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Navigation Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentItem && (
            <Form>
              <Form.Group controlId="formLogo">
                <Form.Label>Brand Logo</Form.Label>
                <Form.Control
                  type="text"
                  value={currentItem.logo}
                  onChange={(e) => handleModalChange('logo', e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formNavItem1">
                <Form.Label className='pt-2'>Nav Item 1</Form.Label>
                <Form.Control
                  type="text"
                  value={currentItem.navItem1}
                  onChange={(e) => handleModalChange('navItem1', e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formNavItem2">
                <Form.Label className='pt-2'>Nav Item 2</Form.Label>
                <Form.Control
                  type="text"
                  value={currentItem.navItem2}
                  onChange={(e) => handleModalChange('navItem2', e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formNavItem3">
                <Form.Label className='pt-2'>Nav Item 3</Form.Label>
                <Form.Control
                  type="text"
                  value={currentItem.navItem3}
                  onChange={(e) => handleModalChange('navItem3', e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formNavItem4">
                <Form.Label className='pt-2'>Nav Item 4</Form.Label>
                <Form.Control
                  type="text"
                  value={currentItem.navItem4}
                  onChange={(e) => handleModalChange('navItem4', e.target.value)}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleModalSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default NavBar;
