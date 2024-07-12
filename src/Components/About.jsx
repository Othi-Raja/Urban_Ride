import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../Components/App.css';
import riderImg from '../images/riderImg.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { firestoreDb } from './firebaseConfig'; // Adjust the import path as necessary
const fetchAboutContent = async () => {
  try {
    const navCollection = collection(firestoreDb, 'About'); // Reference to the Firestore collection
    const navSnapshot = await getDocs(navCollection); // Fetch all documents from the collection
    const navList = navSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Map the documents to their data
    return navList; // Return the fetched data
  } catch (error) {
    console.error("Error fetching nav items:", error); // Handle any errors
    return [];
  }
};
const updateAboutItem = async (id, updatedItem) => {
  try {
    const itemDoc = doc(firestoreDb, 'About', id); // Corrected the collection name to 'About'
    await updateDoc(itemDoc, updatedItem);
    console.log('Document updated with ID: ', id);
  } catch (e) {
    console.error('Error updating document: ', e);
  }
};
const isAuthenticated = () => {
  return localStorage.getItem('Auth') === 'true';
};
export default function About() {
  const [aboutItems, setAboutItems] = useState([]);
  useEffect(() => {
    const getAboutItems = async () => {
      const items = await fetchAboutContent();
      setAboutItems(items);
    };
    getAboutItems();
  }, []); // Empty dependency array ensures this effect runs only once
  const editAboutContent = async (item, field) => {
    if (!isAuthenticated()) {
      // alert('You are not authorized to update the content.');
      return;
    }
    const newValue = prompt(`Update ${field}`, item[field]);
    if (newValue && newValue !== item[field]) {
      const updatedItem = { ...item, [field]: newValue };
      await updateAboutItem(item.id, updatedItem);
      // Update the local state
      setAboutItems(aboutItems.map(aboutItem => aboutItem.id === item.id ? updatedItem : aboutItem));
    }
  };
  // AOS animation
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  return (
    <div>
      {aboutItems.map((item, index) => (
        <div key={index} className="top-faded" id="about" >
          <div className="about-Pg">
            <Container>
              <Row className="text-center pt-5">
                <h2 data-aos="fade-in" className="pb-4 mb-4" onClick={() => editAboutContent(item, 'AbTitle')}>
                  {item.AbTitle}
                </h2>
              </Row>
              <Row>
                <Col sm={12} md={8} className="About-Paragraph">
                  <p data-aos="fade-in" onClick={() => editAboutContent(item, 'PHeading')}>
                    {item.PHeading}
                  </p>
                  <p data-aos="fade-in" onClick={() => editAboutContent(item, 'AbPara1')}>
                    {item.AbPara1}
                  </p>
                  <b data-aos="fade-in" onClick={() => editAboutContent(item, 'PHeading2')}>
                    {item.PHeading2}
                  </b>
                  <p data-aos="fade-in" onClick={() => editAboutContent(item, 'AbPara2')}>
                    {item.AbPara2}
                  </p>
                  <b data-aos="fade-in" onClick={() => editAboutContent(item, 'PHeading3')}>
                    {item.PHeading3}
                  </b>
                  <p data-aos="fade-in" onClick={() => editAboutContent(item, 'AbPara3')}>
                    {item.AbPara3}
                  </p>
                </Col>
                <Col sm={12} md={4} className="riderimg-center">
                  <img data-aos="fade-in" src={riderImg} alt="rider-img" className="img-fluid rider-img" />
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      ))}
    </div>
  );
}
