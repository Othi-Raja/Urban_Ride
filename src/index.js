import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPG from './Components/Landingpage';
import './Components/Landingpg.css'
import './Components/App.css'
import About from './Components/About';
import GeXApp from './Components/GeXApp';
import ContactForm from './Components/ContactForm';
import Footer from './Components/Footer';
import 'aos/dist/aos.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router } from 'react-router-dom';
import BSection from './Components/BSection';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <Router>
   <React.StrictMode>
      <ToastContainer />
    {/* <Navbar /> */}
    <LandingPG/>
    <About/>
    <GeXApp/>
    <BSection/>
    <ContactForm/>
    <Footer/>
  </React.StrictMode>
 </Router>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
