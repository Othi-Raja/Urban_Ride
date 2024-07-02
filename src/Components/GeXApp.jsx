import {React,useEffect }from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import '../Components/App.css';
import appLogo from '../images/AppLogo.png';
import AppstoreLogo from '../images/AppstoreLogo_.svg';
import PlayStoreLogo from '../images/google-play-png-logo-3799.png'
import brandLogos from '../images/brands_Logo.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
export default function GeXApp() {
useEffect(()=>{
  AOS.init({
    duration: 1000,
  });
},[])
    return (
        <div className='GeXApp' id='app'>
             <Container className="mt-4">
      <Row className="text-center">
        <Col>
          <h1  data-aos='fade-in'>Go Extra Mile – The App That Rewards You</h1>
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
          <p data-aos='fade-in'>
            Introducing <b>Go Extra Mile</b>, a revolutionary app for commuters, travelers, and riders. Earn GEM Coins for every mile you travel and redeem exciting rewards. Track your journeys, join a community, and compete in challenges.
          </p>
          <b data-aos='fade-in'>Why Go Extra Mile?</b>
          <p data-aos='fade-in'>Earn Rewards: Collect GEM Coins for every mile you travel.</p>
          <p data-aos='fade-in'>Track Your Journeys: Log your travel history and see your progress.</p>
          <p data-aos='fade-in'>Community Engagement: Connect with fellow travelers and participate in fun challenges.</p>
        </Col>
      </Row>

    <Row className='w-100 text-center  brands-list pt-5 ' id='business'>
      <h2 data-aos='fade-in' data-aos-delay="200">For Business</h2>
      <p data-aos='fade-in' data-aos-delay="300" className='minus-margin'>Want to increase your sales? Get in touch.</p>
      <p data-aos='fade-in' data-aos-delay="400" className='minus-margin-xl'>Below are the ongoing collaborations with brands</p>
    </Row>
    <Row className=' d-flex align-items-center justify-content-center  brands-logo'>
<img data-aos='fade-in' data-aos-delay="500" src={brandLogos} alt="Brand-logo" className='w-50'/>
    </Row>
    </Container>
        </div>
    )
}
