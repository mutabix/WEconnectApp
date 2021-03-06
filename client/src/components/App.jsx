import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../containers/navigation';
import SignUp from '../containers/userSignUp';
import BusinessProfile from '../containers/businessProfile';
import BusinessList from '../containers/businessList';
import UserProfile from '../containers/userProfile';
import Login from '../containers/login';
import RegisterBusiness from '../containers/registerBusiness';
import UpdateBusiness from '../containers/updateBusiness';
import UpdateUser from '../containers/updateUser';
import ContactUs from '../containers/contactUs';

import AboutUs from '../components/Home/presentational/AboutUs.jsx';
import HowItWorks from '../components/Home/presentational/HowItWorks.jsx';
import Home from '../components/Home/presentational/Home.jsx';
import Footer from '../components/General/Footer.jsx';
import NotFound from '../components/General/NotFound.jsx';

/**
 *
 *@class App
 *@classdesc creates a React component- App
 */
class App extends React.Component {
/**
   * Creates a React Component
   * @return {jsx} Success message with the business created or error message
   * @memberof React Component
   */
  render() {
    return (
    <div className="wrapper">
      <Header/>
      <div className="main">
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path = '/aboutUs' component={AboutUs}/>
        <Route exact path = '/businessListing' component={BusinessList}/>
        <Route exact path = '/businessProfile/:id' component={BusinessProfile}/>
        <Route exact path = '/userProfile' component={UserProfile}/>
        <Route exact path = '/contactUs' component={ContactUs}/>
        <Route exact path = '/howItWorks' component={HowItWorks}/>
        <Route exact path = '/login' component={Login}/>
        <Route exact path = '/signUp' component={SignUp}/>
        <Route exact path = '/registerBusiness' component={RegisterBusiness}/>
        <Route exact path = '/updateBusiness/:id' component={UpdateBusiness}/>
        <Route exact path = '/updateUserProfile' component={UpdateUser}/>
        <Route component={NotFound}/>
      </Switch>
    </div>
      <Footer />
    </div>
    );
  }
}

export default App;

