import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from 'react-materialize';
import alertify from 'alertifyjs';
import PropTypes from 'prop-types';


/**
 * Class Representing React Component RegisterBusinessForm
 *@class RegisterBusiness
 *@classdesc creates a React component- RegisterBusinessForm
*/
export default class RegisterBusinessForm extends React.Component {
  /**
    * @param {object} props props from parent class
    * @return {null} creates state and initalizes class variables
    * @memberof RegisterBusinessForm Component
    */
  constructor(props) {
    super(props);
    this.state = {
      business: {
        name: '',
        location: 'null',
        category: 'null',
        address: '',
        email: '',
        description: '',
        telephoneNumber: '',
        homeNumber: ''
      },
    };
  }

  static defaultProps = {
    locations: [
      'ABIA', 'ABUJA', 'ADAMAWA', 'AKWA IBOM', 'ANAMBRA', 'BAUCHI', 'BAYELSA', 'BENUE', 'BORNO',
      'CROSS RIVER', 'DELTA', 'EBONYI', 'EDO', 'EKITI', 'ENUGU', 'GOMBE', 'IMO', 'JIGAWA',
      'KADUNA', 'KANO', 'KATSINA', 'KEBBI', 'KOGI', 'KWARA', 'LAGOS', 'NASSARAWA', 'NIGER', 'OGUN', 'ONDO',
      'OSUN', 'OYO', 'PLATEAU', 'RIVERS', 'SOKOTO', 'TARABA', 'YOBE', 'ZAMFARA'
    ]
  }


  /**
    * onChange Event handler callback for RegisterBusiness form fields
    * @param {object} e the event object
    *
    * @return {null} updates the state of the RegisterBusinessForm component
    * @memberof RegisterBusinessForm Component
    */
  onChange = e =>
    this.setState({
      ...this.state,
      business: { ...this.state.business, [e.target.name]: e.target.value }
    });

  /**
      * onSubmit Event handler callback for RegisterBusiness form
      * @param {object} e The event object
      *
      * @return {null}  Business Registered message or returns error message
      * @memberof RegisterBusinessForm Component
      */
  handleRegisterBusinessSubmit = (e) => {
    e.preventDefault();
    if (this.state.business.category === 'null' || this.state.business.location === 'null') {
      alertify.set('notifier', 'position', 'top-right');
      return alertify.error('Business Location and Category are required');
    }
    const businessDetails = {
      name: this.state.business.name,
      location: this.state.business.location,
      category: this.state.business.category,
      description: this.state.business.description,
      address: this.state.business.address,
      email: this.state.business.email,
      telephoneNumber: this.state.business.telephoneNumber
    };

    if (this.state.business.homeNumber.length > 1) {
      businessDetails.homeNumber = this.state.business.homeNumber;
    }
    this.props.submit(businessDetails);
  }

  /**
    * Renders the RegisterBusinessForm Component
    * @return {jsx} jsx element to render
    * @memberof RegisterBusinessForm Component
    */
  render() {
    const { categories } = this.props;
    const businessCategories = categories;
    const categoryOptions = businessCategories !== undefined ?
      Array.from(businessCategories).map(category =>
        <option key={category} value={category}>{category}</option>) : null;

    const locationOptions = this.props.locations.map(location =>
  <option key={location} value={location}>{location}</option>);

    const { business } = this.state;

    return <div className="row">
        <form onSubmit={this.handleRegisterBusinessSubmit}>
          <div className="row">
            <div className="input-field col s12 m12 l12">
              <i className="material-icons prefix">business_center</i>
              <label htmlFor="name">Business Name</label>
              <input type="text" id="name" name="name" pattern="^[a-zA-Z0-9\s.\-]+$" title="should contain only alphabets" minLength="3" maxLength="50" value={business.name} onChange={this.onChange} className="validate" required />
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12 m6 l6">
              <Input type="select" name="location" value={business.location} onChange={this.onChange} required>
                <option value="null" disabled>
                  Choose Your Location
                </option>
                {locationOptions}
              </Input>
              {/* <label>Location</label> */}
            </div>
            <div className="input-field col s12 m6 l6">
              <Input type="select" name="category" value={business.category} onChange={this.onChange} required>
                <option value="null" disabled>
                  Choose Your Category
                </option>
                {businessCategories.length > 0 ? categoryOptions : <option value="loading" disabled>
                    Loading...
                  </option>}
              </Input>
              {/* <label>Category</label> */}
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12 m12 l12">
              <i className="material-icons prefix">email</i>
              <label htmlFor="email">Contact Email Address</label>
              <input type="email" id="email" name="email" pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$" value={business.email} onChange={this.onChange} placeholder="johndoe@gmail.com" ref="email" className="validate" required />
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12 m12 l12">
              <i className="material-icons prefix">location_on</i>
              <label htmlFor="address">Business Address</label>
              <input type="text" id="address" name="address" value={business.address} minLength="4" maxLength="50" onChange={this.onChange} placeholder="Enter Business Address" ref="address" className="validate" required />
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12 m12 l6">
              <i className="material-icons prefix">phone</i>
              <label htmlFor="telephoneNumber">Telephone Number</label>
              <input type="text" id="telephoneNumber" name="telephoneNumber" pattern="^[0-9]+$" minLength="7" maxLength="11" value={business.telephoneNumber} onChange={this.onChange} ref="telephoneNumber" className="validate" required />
            </div>
            <div className="input-field col s12 m12 l6">
              <i className="material-icons prefix">phone</i>
              <label htmlFor="homeNumber">Home Number</label>

              <input type="text" id="homeNumber" name="homeNumber" pattern="^[0-9]+$" minLength="7" maxLength="11" value={business.homeNumber} onChange={this.onChange} ref="homeNumber" className="validate" />
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12 m12 l12">
              <i className="material-icons prefix">mode_edit</i>
              <textarea name="description" id="description" value={business.description} minLength="20" maxLength="500" onChange={this.onChange} className="materialize-textarea" ref="description" required />
              <label htmlFor="description">Business Description</label>
            </div>
          </div>
          <br />
          <div className="input-field">
            <button type="submit" className="btn-large waves-effect waves-dark blue lighten-1" style={{ width: `${100}%` }}>
              REGISTER BUSINESS
            </button>
          </div>
          <br />
          <div className="row">
            <div className="col s12 m12 l6 offset-l3 center">
              <h6>
                <Link to="/userProfile">Go Back to Profile Page</Link>
              </h6>
            </div>
          </div>
        </form>
      </div>;
  }
}

RegisterBusinessForm.propTypes = {
  submit: PropTypes.func.isRequired,
};
