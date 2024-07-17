import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Components/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faLink } from '@fortawesome/free-solid-svg-icons';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { collection, getDocs, firestoreDb } from './firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';
const fetchAppItems = async () => {
  try {
    const navCollection = collection(firestoreDb, 'MyApp');
    const navSnapshot = await getDocs(navCollection);
    const navList = navSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return navList;
  } catch (error) {
    console.error("Error fetching nav items:", error);
    return [];
  }
};
const updateAppItem = async (id, updatedItem) => {
  try {
    const itemDoc = doc(firestoreDb, 'MyApp', id);
    await updateDoc(itemDoc, updatedItem);
    // console.log('Document updated with ID: ', id);
  } catch (e) {
    console.error('Error updating document: ', e);
    throw e;  
  }
};
const isAuthenticated = () => {
  return localStorage.getItem('Auth') === 'true';
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
const GeXApp = () => {
  const [AppItems, setAppItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [editorContent, setEditorContent] = useState('');
  const [myappImgUrl, setMyappImgUrl] = useState('');
  const [playStoreLogoUrl, setPlayStoreLogoUrl] = useState('');
  const [playStoreLogoImgUrl, setPlayStoreLogoImgUrl] = useState('');
  const [appstoreLogoUrl, setAppstoreLogoUrl] = useState('');
  const [appstoreLogoImgUrl, setAppstoreLogoImgUrl] = useState('');
  const [showPlayStoreLogo, setShowPlayStoreLogo] = useState(true); // Default to true
  const [showAppstoreLogo, setShowAppstoreLogo] = useState(true); // Default to true
  useEffect(() => {
    const getAppItems = async () => {
      const items = await fetchAppItems();
      setAppItems(items);
    };
    getAppItems();
  }, []);  
  const handleNavLinkClick = (item) => {
    if (!isAuthenticated()) {
      return;
    }
    setCurrentItem(item);
    setEditorContent(item.AppPara || '');
    setMyappImgUrl(item.myappImg || '');
    setPlayStoreLogoUrl(item.PlayStoreLogo.PlayStoreLogoUrl || '');
    setPlayStoreLogoImgUrl(item.PlayStoreLogo.PlayStoreLogoImg || '');
    setAppstoreLogoUrl(item.AppstoreLogo.AppstoreLogoUrl || '');
    setAppstoreLogoImgUrl(item.AppstoreLogo.AppstoreLogoImg || '');
    setShowModal(true);
  };
  const handleCancel = () => {
    setShowModal(false);
  };
  const handleUpload = async () => {
    try {
      if (currentItem) {
        const updatedItem = {
          ...currentItem,
          AppPara: editorContent,
          myappImg: myappImgUrl,
          PlayStoreLogo: {
            ...currentItem.PlayStoreLogo,
            PlayStoreLogoUrl: playStoreLogoUrl,
            PlayStoreLogoImg: playStoreLogoImgUrl,
            show: showPlayStoreLogo, // Include show state
          },
          AppstoreLogo: {
            ...currentItem.AppstoreLogo,
            AppstoreLogoUrl: appstoreLogoUrl,
            AppstoreLogoImg: appstoreLogoImgUrl,
            show: showAppstoreLogo, // Include show state
          },
        };
        await updateAppItem(currentItem.id, updatedItem);
        setAppItems(AppItems.map(item => item.id === currentItem.id ? updatedItem : item));
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error saving content:', error);
    }
  };
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  const isAuth = isAuthenticated();
  return (
    <div>
      {AppItems.map((item, index) => (
        <div className='GeXApp' id='app' key={index}>
          <Container className="mt-4 pt-5">
            <Row className="text-center">
              {/* <Col>
                <h1 data-aos='fade-in'>{item.AppTitle}</h1>
              </Col> */}
            </Row>
            <Row className="align-items-start">
              <Col sm={12} md={4} className="text-center">
                <img data-aos='fade-in' src={item.myappImg} alt="app-logo" className="App-Logo px-2 img-fluid" />
                <Row>
                  <Col className="d-flex justify-content-center align-items-center gap-4">
                    {showPlayStoreLogo && (
                      <a href={item.PlayStoreLogo.PlayStoreLogoUrl}>
                        <img
                          data-aos='fade-in'
                          src={item.PlayStoreLogo.PlayStoreLogoImg}
                          alt="Play Store Logo"
                          className="logo1 img-fluid"
                          style={{ width: '100%', height: 'auto', maxHeight: '100px' }}
                        />
                      </a>
                    )}
                    {showAppstoreLogo && (
                      <a href={item.AppstoreLogo.AppstoreLogoUrl}>
                        <img
                          data-aos='fade-in'
                          src={item.AppstoreLogo.AppstoreLogoImg}
                          alt="App Store Logo"
                          className="logo img-fluid"
                          style={{ width: '100%', height: 'auto', maxHeight: '100px' }}
                        />
                      </a>
                    )}
                  </Col>
                </Row>
              </Col>
              <Col sm={12} md={8} className="txt-justify align-self-start">
                <div data-aos='fade-in'>
                  <div
                    data-aos="fade-in"
                    dangerouslySetInnerHTML={{ __html: item.AppPara }}
                  />
                  {isAuth && (
                    <Button className='edit-Icon' size="sm" onClick={() => handleNavLinkClick(item)}>
                      <FontAwesomeIcon icon={faPen} />
                    </Button>
                  )}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      ))}
      <Modal show={showModal} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Content</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactQuill
            theme="snow"
            value={editorContent}
            onChange={setEditorContent}
            modules={modules}
            formats={formats}
          />
          <Form.Group controlId="myappImgUrl">
            <Form.Label>App Image </Form.Label>
            <Form.Control
              type="text"
              value={myappImgUrl}
              onChange={(e) => setMyappImgUrl(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="playStoreLogoUrl">
            <Form.Label>PlayStore <FontAwesomeIcon icon={faLink} /> </Form.Label>
            <Form.Control
              type="text"
              value={playStoreLogoUrl}
              onChange={(e) => setPlayStoreLogoUrl(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="playStoreLogoImgUrl">
            <Form.Label>PlayStore Image</Form.Label>
            <Form.Control
              type="text"
              value={playStoreLogoImgUrl}
              onChange={(e) => setPlayStoreLogoImgUrl(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="appstoreLogoUrl">
            <Form.Label>AppStore <FontAwesomeIcon icon={faLink} /></Form.Label>
            <Form.Control
              type="text"
              value={appstoreLogoUrl}
              onChange={(e) => setAppstoreLogoUrl(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="appstoreLogoImgUrl">
            <Form.Label>AppStore Image</Form.Label>
            <Form.Control
              type="text"
              value={appstoreLogoImgUrl}
              onChange={(e) => setAppstoreLogoImgUrl(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="showPlayStoreLogo" className='mx-3 mt-3'>
            <Form.Check
              type="switch"
              id="showPlayStoreLogo"
              className='px-5'
              label="Show PlayStore "
              checked={showPlayStoreLogo}
              onChange={() => setShowPlayStoreLogo(!showPlayStoreLogo)}
            />
          </Form.Group>
          <Form.Group controlId="showAppstoreLogo" className='mx-3 '>
            <Form.Check
              type="switch"
              className='px-5'
              id="showAppstoreLogo"
              label="Show AppStore "
              checked={showAppstoreLogo}
              onChange={() => setShowAppstoreLogo(!showAppstoreLogo)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpload}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default GeXApp;
