import { React, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import '../Components/Landingpg.css'
import Navbar from './Navbar';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Admin from './admin/Admin'
import { Routes, Route, useLocation } from 'react-router-dom';
import { collection, getDocs, firestoreDb } from './firebaseConfig'; // Adjust the import path as necessary
import { doc, updateDoc } from 'firebase/firestore'; // Import updateDoc

const fetchNavItems = async () => {
  try {
    const navCollection = collection(firestoreDb, 'HomePg'); // Reference to the Firestore collection
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

function LandingPG() {
  const [navItems, setNavItems] = useState([]);

  useEffect(() => {
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

  // AOS animation initialization
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
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

  return (
    <div>
      {navItems.map((item, index) => (
        <div key={index} className='landing-pg bg-black'>
          <div className="background-image">
            <Navbar />
            <Routes>
              <Route path="/Admin" element={<Admin />} />
            </Routes>
            <Container className="text-center text-overlay">
              <p className='LP-text1' data-aos='fade-in' data-aos-delay='200' onClick={() => handleNavLinkClick(item, 'pageTxt1')}>
                {item.pageTxt1}
              </p>
              <p className='LP-text2' data-aos='fade-in' data-aos-delay='300' onClick={() => handleNavLinkClick(item, 'pageTxt2')}>
                {item.pageTxt2}
              </p>
            </Container>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LandingPG;
