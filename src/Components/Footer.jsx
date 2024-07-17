import { React, useEffect, useState } from 'react'
import { Container, Row, Col, Modal } from 'react-bootstrap';
import '../Components/App.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import Switch from 'react-switch';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { firestoreDb } from './firebaseConfig'; // Adjust the import path as necessary
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
const fetchAboutContent = async () => {
    try {
        const navCollection = collection(firestoreDb, 'FooterItems'); // Reference to the Firestore collection
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
        const itemDoc = doc(firestoreDb, 'FooterItems', id); // Corrected the collection name to 'About'
        await updateDoc(itemDoc, updatedItem);
        // console.log('Document updated with ID: ', id);
    } catch (e) {
        console.error('Error updating document: ', e);
    }
};
const isAuthenticated = () => {
    return localStorage.getItem('Auth') === 'true';
};
export default function Footer() {
    const [aboutItems, setAboutItems] = useState([]);
    useEffect(() => {
        const getAboutItems = async () => {
            const items = await fetchAboutContent();
            setAboutItems(items);
        };
        getAboutItems();
    }, []); // Empty dependency array ensures this effect runs only once
    const editAboutContent = async (item, field, newValue) => {
        if (!isAuthenticated()) {
            // alert('You are not authorized to update the content.');
            return;
        }
        if (newValue && newValue !== item[field]) {
            // Optimistic UI Update
            const updatedItem = { ...item, [field]: newValue };
            setAboutItems(aboutItems.map(aboutItem => aboutItem.id === item.id ? updatedItem : aboutItem));
            try {
                await updateAboutItem(item.id, updatedItem);
            } catch (error) {
                console.error("Failed to update the item:", error);
                // Revert the UI update if the async operation fails
                setAboutItems(aboutItems.map(aboutItem => aboutItem.id === item.id ? item : aboutItem));
            }
        }
    };
    const editcopyRContent = async (item, field) => {
        if (!isAuthenticated()) {
            // alert('You are not authorized to update the content.');
            return;
        }
        const newValue = prompt(`Update ${field}`, item[field]);
        if (newValue && newValue !== item[field]) {
            // Optimistic UI Update
            const updatedItem = { ...item, [field]: newValue };
            setAboutItems(aboutItems.map(aboutItem => aboutItem.id === item.id ? updatedItem : aboutItem));
            try {
                await updateAboutItem(item.id, updatedItem);
            } catch (error) {
                console.error("Failed to update the item:", error);
                // Revert the UI update if the async operation fails
                setAboutItems(aboutItems.map(aboutItem => aboutItem.id === item.id ? item : aboutItem));
            }
        }
    };
    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration
        });
    }, []);
    const [modalShow, setModalShow] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const handleShowModal = (item) => {
        setCurrentItem(item);
        setModalShow(true);
    };
    const handleCloseModal = () => {
        setModalShow(false);
    };
    const date = new Date().getFullYear();
    const isAuth = localStorage.getItem('Auth') === 'true';
    const handleInputChange = (field, index, value) => {
        setCurrentItem(prevItem => ({
            ...prevItem,
            [field]: prevItem[field] ? [
                ...prevItem[field].slice(0, index),
                value,
                ...prevItem[field].slice(index + 1)
            ] : prevItem[field]
        }));
    };
    const handleInputChangecopyright = (field, value) => {
        setCurrentItem(prevItem => ({
            ...prevItem,
            Copuright: {
                ...prevItem.Copuright,
                [field]: value
            }
        }));
    };
    const handleInputChangepvt = (field, value) => {
        setCurrentItem(prevItem => ({
            ...prevItem,
            PvtPolicy: {
                ...prevItem.PvtPolicy,
                [field]: value
            }
        }));
    };
const handleSaveChanges = async () => {
    if (!currentItem) return; // Ensure currentItem is defined
    try {
        // Validate fields before update
        if (!currentItem.Copuright) {
            console.error('Invalid data format for update: Copuright is missing');
            return;
        }
        // Fields can be empty, so no need to check for CRText or CRUrl presence
        await updateAboutItem(currentItem.id, currentItem); // Implement updateAboutItem to save changes in Firestore
        handleCloseModal();
    } catch (error) {
        console.error('Failed to save changes:', error);
        // Optionally handle error or display message to user
    }
};
    return (
        <div className='Footer' >
            <Container className='text-center pb-4'>
                <div className='p-4'>
                    <h2 data-aos='fade-in'>Join Me on This Ride</h2>
                    <p data-aos='fade-in'>Thank you for your support! Stay connected, informed, and enjoy the ride. </p>
                    <p data-aos='fade-in'>Follow me on social media, subscribe to updates, and download Go Extra Mile to start <br />
                        earning rewards today. </p>
                    <p data-aos='fade-in'>Let’s ride the future together!</p>
                </div>
                <hr />
                {aboutItems.length > 0 ? (
                    aboutItems.map((item, index) => (
                        <Row className='justify-content-center text-center' key={index}>
                            <Col xs={12} md={4} className="mb-3 mb-md-0" style={{display:item.Copuright.CRText ===" "? "none": "block" }}>
                                <small onClick={() => editcopyRContent(item, 'Copuright')} >
                                    <a href={item.Copuright.CRUrl}  className='F-disable-link-style'>
                                        <b>{date} &copy; {item.Copuright.CRText} </b>
                                    </a>
                                </small>
                            </Col>
                            <Col xs={12} md={4} className="mb-3 d-flex align-items-center justify-content-center gap-4">
                                {/* {item.instalogo.map((logo, index) => (<a key={index} href={`#${logo}`} onClick={() => editAboutContent(item, logo)}><span dangerouslySetInnerHTML={{ __html: logo }} /></a>))} */}
                                <a className='showAuthIcon' href={item.socialmediaLink[0]} rel="noopener noreferrer" target='_blank' style={{ display: item.instagramLIveUnlive }}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-instagram" viewBox="0 0 16 16">
                                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                                </svg></a>
                                <a href={item.socialmediaLink[1]} target='_blank' rel="noopener noreferrer" style={{ display: item.FacebookLIveUnlive }}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-facebook" viewBox="0 0 16 16">
                                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                                </svg></a>
                                <a href={item.socialmediaLink[2]} target='_blank' rel="noopener noreferrer" style={{ display: item.LinkedinLIveUnlive }}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-linkedin" viewBox="0 0 16 16">
                                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                                </svg></a>
                                <a href={item.socialmediaLink[3]} target='_blank' rel="noopener noreferrer" style={{ display: item.tweeterLIveUnlive }}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-twitter" viewBox="0 0 16 16">
                                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334q.002-.211-.006-.422A6.7 6.7 0 0 0 16 3.542a6.7 6.7 0 0 1-1.889.518 3.3 3.3 0 0 0 1.447-1.817 6.5 6.5 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.32 9.32 0 0 1-6.767-3.429 3.29 3.29 0 0 0 1.018 4.382A3.3 3.3 0 0 1 .64 6.575v.045a3.29 3.29 0 0 0 2.632 3.218 3.2 3.2 0 0 1-.865.115 3 3 0 0 1-.614-.057 3.28 3.28 0 0 0 3.067 2.277A6.6 6.6 0 0 1 .78 13.58a6 6 0 0 1-.78-.045A9.34 9.34 0 0 0 5.026 15" />
                                </svg></a>
                                {
                                    isAuth && (
                                        <div className="editicon position-relative" style={{ zIndex: '999', display: isAuth ? 'block' : 'none' }} onClick={() => handleShowModal(item)}>
                                            <svg fill="#2fe970" className='blink pt-1' width="35px" height="35px" viewBox="-2 -2 24.00 24.00" xmlns="http://www.w3.org/2000/svg" stroke="#2fe970" transform="rotate(45)">
                                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                                <g id="SVGRepo_iconCarrier"><path d="M7.8 10a2.2 2.2 0 0 0 4.4 0 2.2 2.2 0 0 0-4.4 0z"></path></g>
                                            </svg>
                                        </div>
                                    )
                                }
                            </Col>
                            <Col xs={12} md={4} style={{display:item.PvtPolicy.PvtText === " "? "none": "block" }}>
                                <a href={item.PvtPolicy.PvtUrl} className='F-disable-link-style'>
                                    <small onClick={() => editcopyRContent(item, 'PvtPolicy')}><b>{item.PvtPolicy.PvtText}</b></small>
                                </a>
                            </Col>
                            {/* Modal for Live/Unlive Options */}
                            <Modal show={modalShow} onHide={handleCloseModal}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Edit Social Media Links</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    {currentItem && (
                                        <> 
                                            <div className='mb-3'>
                                                <label htmlFor='instagramLink' className='form-label'>Instagram  <span>{<FontAwesomeIcon color='grey'  width={17} icon={faLink}/>}</span></label>
                                                <input type='text' className='form-control ' id='instagramLink' value={currentItem.socialmediaLink[0]} onChange={(e) => handleInputChange('socialmediaLink', 0, e.target.value)} />
                                                <div className='d-flex float-end pt-2'>
                                                <Switch
                                                    onChange={(checked) => editAboutContent(item, 'instagramLIveUnlive', checked ? 'block' : 'none')}
                                                    checked={item.instagramLIveUnlive === 'block'}
                                                    onColor="#183153"
                                                    offColor="#183153"
                                                    handleDiameter={20}
                                                    onHandleColor='#00d26a'
                                                    offHandleColor='#f8312f'
                                                />
                                                </div>
                                            </div>
                                            <div className='mb-3'>
                                                <label htmlFor='facebookLink' className='form-label'>Facebook  <span>{<FontAwesomeIcon color='grey'  width={17} icon={faLink}/>}</span></label>
                                                <input type='text' className='form-control' id='facebookLink' value={currentItem.socialmediaLink[1]} onChange={(e) => handleInputChange('socialmediaLink', 1, e.target.value)} />
                                                <div className='d-flex float-end pt-2'>
                                                <Switch
                                                    onChange={(checked) => editAboutContent(item, 'FacebookLIveUnlive', checked ? 'block' : 'none')}
                                                    checked={item.FacebookLIveUnlive === 'block'}
                                                    onColor="#183153"
                                                    offColor="#183153"
                                                    handleDiameter={20}
                                                    onHandleColor='#00d26a'
                                                    offHandleColor='#f8312f'
                                                />
                                                </div>
                                            </div>
                                            <div className='mb-3'>
                                                <label htmlFor='linkedinLink' className='form-label'>LinkedIn  <span>{<FontAwesomeIcon color='grey'  width={17} icon={faLink}/>}</span></label>
                                                <input type='text' className='form-control' id='linkedinLink' value={currentItem.socialmediaLink[2]} onChange={(e) => handleInputChange('socialmediaLink', 2, e.target.value)} />
                                                <div className='d-flex float-end pt-2'>
                                                <Switch
                                                    onChange={(checked) => editAboutContent(item, 'LinkedinLIveUnlive', checked ? 'block' : 'none')}
                                                    checked={item.LinkedinLIveUnlive === 'block'}
                                                    onColor="#183153"
                                                    offColor="#183153"
                                                    handleDiameter={20}
                                                    onHandleColor='#00d26a'
                                                    offHandleColor='#f8312f'
                                                />
                                                </div>
                                            </div>
                                            <div className='mb-3'>
                                                <label htmlFor='twitterLink' className='form-label'>Twitter  <span>{<FontAwesomeIcon color='grey'  width={17} icon={faLink}/>}</span></label>
                                                <input type='text' className='form-control' id='twitterLink' value={currentItem.socialmediaLink[3]} onChange={(e) => handleInputChange('socialmediaLink', 3, e.target.value)} />
                                                <div className='d-flex float-end pt-2'>
                                                <Switch
                                                    onChange={(checked) => editAboutContent(item, 'tweeterLIveUnlive', checked ? 'block' : 'none')}
                                                    checked={item.tweeterLIveUnlive === 'block'}
                                                    onColor="#183153"
                                                    offColor="#183153"
                                                    handleDiameter={20}
                                                    onHandleColor='#00d26a'
                                                    offHandleColor='#f8312f'
                                                />
                                                </div>
                                            </div>
                                            <span  className='model-content-title'>CopyRight </span>
                                            <input
                                                type="text"
                                                className="form-control mb-3"
                                                value={currentItem.Copuright.CRText}
                                                onChange={(e) => handleInputChangecopyright('CRText', e.target.value)}
                                            />
                                            <span>Url <span>{<FontAwesomeIcon color='grey'  width={17} icon={faLink}/>}</span></span>
                                            <input
                                                type="text"
                                                className="form-control mb-3"
                                                value={currentItem.Copuright.CRUrl}
                                                onChange={(e) => handleInputChangecopyright('CRUrl', e.target.value)}
                                            />
                                              <span className='model-content-title'>Term&condition</span>
                                            <input
                                                type="text"
                                                className="form-control mb-3"
                                                value={currentItem.PvtPolicy.PvtText}
                                                onChange={(e) => handleInputChangepvt('PvtText', e.target.value)}
                                            />
                                           <span className='model-content-title'>Url <span>{<FontAwesomeIcon width={17} color='grey' icon={faLink}/>}</span></span>
                                            <input
                                                type="text"
                                                className="form-control mb-3"
                                                value={currentItem.PvtPolicy.PvtUrl}
                                                onChange={(e) => handleInputChangepvt('PvtUrl', e.target.value)}
                                            />
                                        </>
                                    )}
                                </Modal.Body>
                                <Modal.Footer>
                                    <button className="btn btn-secondary" onClick={handleCloseModal}>
                                        Cancel
                                    </button>
                                    <button className="btn btn-primary" onClick={handleSaveChanges}>
                                        Save
                                    </button>
                                </Modal.Footer>
                            </Modal>
                        </Row>
                    ))
                ) : (
                    <p>No items to display</p>
                )}
            </Container>
        </div >
    )
}
