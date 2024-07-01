import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import '../Components/App.css';
import appLogo from '../images/AppLogo.png';
import AppstoreLogo from '../images/AppstoreLogo_.svg';
import PlayStoreLogo from '../images/google-play-png-logo-3799.png'
import brandLogos from '../images/brands_Logo.png'
export default function GeXApp() {
    return (
        <div className='GeXApp'>
             <Container className="my-4">
      <Row className="text-center">
        <Col>
          <h1>Go Extra Mile – The App That Rewards You</h1>
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col sm={12} md={4} className="pt-5 text-center">
          <img src={appLogo} alt="app-logo" className="App-Logo px-2 img-fluid" />
          <Row >
            <Col className="d-flex justify-content-center align-items-center gap-3">
              <img src={PlayStoreLogo} alt="Play Store Logo" className="logo1 img-fluid" />
              <img src={AppstoreLogo} alt="App Store Logo" className="logo img-fluid" />
            </Col>
          </Row>
        </Col>
        <Col sm={12} md={8}>
          <p>
            Introducing <b>Go Extra Mile</b>, a revolutionary app for commuters, travelers, and riders. Earn GEM Coins for every mile you travel and redeem exciting rewards. Track your journeys, join a community, and compete in challenges.
          </p>
          <b>Why Go Extra Mile?</b>
          <p>Earn Rewards: Collect GEM Coins for every mile you travel.</p>
          <p>Track Your Journeys: Log your travel history and see your progress.</p>
          <p>Community Engagement: Connect with fellow travelers and participate in fun challenges.</p>
        </Col>
      </Row>

    <Row className='w-100 text-center  brands-list pt-5 '>
      <h2 className=''>For Business</h2>
      <p className='minus-margin'>Want to increase your sales? Get in touch.</p>
      <p className='minus-margin-xl'>Below are the ongoing collaborations with brands</p>
    </Row>
    <Row className=' d-flex align-items-center justify-content-center  brands-logo pb-5'>
<img src={brandLogos} alt="Brand-logo" className='w-50'/>
    </Row>
    </Container>
        </div>
    )
}
