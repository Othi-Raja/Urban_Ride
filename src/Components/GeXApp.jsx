import { React, useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import '../Components/App.css';
import appLogo from '../images/AppLogo.png';
import AppstoreLogo from '../images/AppstoreLogo_.svg';
import PlayStoreLogo from '../images/google-play-png-logo-3799.png'
import brandLogos from '../images/brands_Logo.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { collection, getDocs, firestoreDb } from './firebaseConfig'; // Adjust the import path as necessary
import { doc, updateDoc } from 'firebase/firestore'; // Import updateDoc

const fetchAppItems = async () => {
  try {
    const navCollection = collection(firestoreDb, 'MyApp'); // Reference to the Firestore collection
    const navSnapshot = await getDocs(navCollection); // Fetch all documents from the collection
    const navList = navSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Map the documents to their data
    return navList; // Return the fetched data
  } catch (error) {
    console.error("Error fetching nav items:", error); // Handle any errors
    return [];
  }
};
const updateAppItem = async (id, updatedItem) => {
  try {
    const itemDoc = doc(firestoreDb, 'MyApp', id);
    await updateDoc(itemDoc, updatedItem);
    console.log('Document updated with ID: ', id);
  } catch (e) {
    console.error('Error updating document: ', e);
  }
};
const isAuthenticated = () => {
  return localStorage.getItem('Auth') === 'true';
};
export default function GeXApp() {
  const [AppItems, setAppItems] = useState([]);
  useEffect(() => {
    const getAppItems = async () => {
      const items = await fetchAppItems();
      setAppItems(items);
    };
    getAppItems();
  }, []); // Empty dependency array ensures this effect runs only once
  const handleNavLinkClick = async (item, field) => {
    if (!isAuthenticated()) {
      // alert('You are not authorized to update the nav item.');
      return;
    }
    const newValue = prompt(`Update ${field}`, item[field]);
    if (newValue && newValue !== item[field]) {
      const updatedItem = { ...item, [field]: newValue };
      await updateAppItem(item.id, updatedItem);
      // Update the local state
      setAppItems(AppItems.map(APPItem => APPItem.id === item.id ? updatedItem : APPItem));
    }
  };
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, [])
  return (
    <div>
      {AppItems.map((item, index) => (
        <div className='GeXApp' id='app' key={index}>
          <Container className="mt-4">
            <Row className="text-center">
              <Col>
                <h1 data-aos='fade-in' onClick={() => handleNavLinkClick(item, 'AppTitle')}>{item.AppTitle}</h1>
              </Col>
            </Row>
            <Row className="align-items-center">
              <Col sm={12} md={4} className="pt-5 text-center">
                <img data-aos='fade-in' src={appLogo} alt="app-logo" className="App-Logo px-2 img-fluid" />
                <Row >
                  <Col className="d-flex justify-content-center align-items-center gap-4">
                    <img data-aos='fade-in' src={PlayStoreLogo} alt="Play Store Logo" className="logo1 img-fluid w-100 h-100" />
                    <img data-aos='fade-in' src={AppstoreLogo} alt="App Store Logo" className="logo img-fluid w-100 h-100 " />
                  </Col>
                </Row>
              </Col>
              <Col sm={12} md={8} className='txt-justify'>
                <p data-aos='fade-in' onClick={() => handleNavLinkClick(item, 'AppPara')}>
                  {item.AppPara}
                </p>
                <b data-aos='fade-in' onClick={() => handleNavLinkClick(item, 'appSubTitle')}>{item.appSubTitle}</b>
                <p data-aos='fade-in'>Earn Rewards: Collect GEM Coins for every mile you travel.</p>
                <p data-aos='fade-in'>Track Your Journeys: Log your travel history and see your progress.</p>
                <p data-aos='fade-in'>Community Engagement: Connect with fellow travelers and participate in fun challenges.</p>
              </Col>
            </Row>
            <Row className='w-100 text-center  brands-list pt-5 ' id='business'>
              <h2 data-aos='fade-in' data-aos-delay="200" onClick={() => handleNavLinkClick(item, 'businesTitle')}>{item.businesTitle}</h2>
              <p data-aos='fade-in' data-aos-delay="300" className='minus-margin' onClick={() => handleNavLinkClick(item, 'BSubTitle')}>{item.BSubTitle}</p>
              <p data-aos='fade-in' data-aos-delay="400" className='minus-margin-xl' onClick={() => handleNavLinkClick(item, 'BSubTitle2')}>{item.BSubTitle2}</p>
            </Row>
            <Row className=' d-flex align-items-center justify-content-center  brands-logo'>
              <img data-aos='fade-in' data-aos-delay="500" src={brandLogos} alt="Brand-logo" className='w-50' />
            </Row>
          </Container>
        </div>
      ))}
    </div>
  )
}
