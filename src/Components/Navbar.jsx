import { React, useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../Components/App.css';
import { useLocation } from 'react-router-dom';

import { collection, getDocs, firestoreDb } from './firebaseConfig'; // Adjust the import path as necessary
import { doc, updateDoc } from 'firebase/firestore'; // Import updateDoc
const fetchNavItems = async () => {
  try {
    const navCollection = collection(firestoreDb, 'NavItem'); // Reference to the Firestore collection
    const navSnapshot = await getDocs(navCollection); // Fetch all documents from the collection
    const navList = navSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Map the documents to their data
    return navList; // Return the fetched data
  } catch (error) {
    console.error("Error fetching nav items:", error); // Handle any errors
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
  const handleNavLinkClick = async (item, field) => {
    if (!isAuthenticated()) {
      // alert('You are not authorized to update the nav item.');
      return;
    }
    const newValue = prompt(`Update ${field}`, item[field]);
    if (newValue && newValue !== item[field]) {
      const updatedItem = { ...item, [field]: newValue };
      await updateNavItem(item.id, updatedItem);
      // Update the local state
      setNavItems(navItems.map(navItem => navItem.id === item.id ? updatedItem : navItem));
    }
  };
 const location = useLocation();
 const  routeruthDenide =()=> {
  
  useEffect(() => {
    if (location.pathname === '/') {
     localStorage.clear()
    }
  }, [location]);
  
 }
 routeruthDenide()

  return (
    <div>
      <Navbar className='Nav-bg fixed-top bg-glass' variant="dark" expand="lg" expanded={expanded} onToggle={() => setExpanded(!expanded)}>
        <>
          {navItems.map((item, index) => (
            <Container key={index}>
              <Navbar.Brand data-aos='fade-in' href="#home" className='urban-logo' onClick={() => handleNavLinkClick(item, 'logo')} style={{ color: '#FF0000', fontSize: '40px' }}>
                {item.logo}
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" className='toggle-btn' />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                  <Nav.Link
                    className='nav-hover'
                    data-aos='fade-in'
                    data-delay='200'
                    href="#about"
                    style={{ fontWeight: '700' }}
                    onClick={() => handleNavLinkClick(item, 'navItem1')}
                  >
                    {item.navItem1}
                  </Nav.Link>
                  <Nav.Link
                    className='nav-hover'
                    data-aos='fade-in'
                    data-delay='400'
                    href="#app"
                    style={{ fontWeight: '700' }}
                    onClick={() => handleNavLinkClick(item, 'navItem2')}
                  >
                    {item.navItem2}
                  </Nav.Link>
                  <Nav.Link
                    className='nav-hover'
                    data-aos='fade-in'
                    data-delay='600'
                    href="#business"
                    style={{ fontWeight: '700' }}
                    onClick={() => handleNavLinkClick(item, 'navItem3')}
                  >
                    {item.navItem3}
                  </Nav.Link>
                  <Nav.Link
                    className='nav-hover'
                    data-aos='fade-in'
                    data-delay='800'
                    href="#contact"
                    style={{ fontWeight: '700' }}
                    onClick={() => handleNavLinkClick(item, 'navItem4')}
                  >
                    {item.navItem4}
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          ))}
        </>
      </Navbar>
    </div>
  );
}
export default NavBar;
