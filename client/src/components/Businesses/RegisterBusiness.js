import React from 'react';

/**
 *
 *@class RegisterBusiness
 *@classdesc creates a React component- RegisterBusiness
*/
export default class RegisterBusiness extends React.Component {
  /**
* Creates a React Component
* @param {object} props the props object for component
* @return {jsx} renders the register business page
* @memberof React Component
*/
  constructor(props) {
    super(props);
    this.state = {
      locationValue: 'Choose your location',
      categoryValue: 'Choose your category'
    };
  }
static defaultProps = {
  categories: [
    'Gaming', 'Technology', 'Housing', 'Transport', 'Power & Energy', 'Food',
    'Consulting Services', 'Construction', 'Educational Services', 'Government', 'Religion'
  ],
  locations: [
    'ABIA', 'ADAMAWA', 'AKWA IBOM', 'ANAMBRA', 'BAUCHI', 'BAYELSA', 'BENUE', 'BORNO',
    'CROSS RIVER', 'DELTA', 'EBONYI', 'EDO', 'EKITI', 'ENUGU', 'FCT-ABUJA', 'GOMBE', 'IMO', 'JIGAWA',
    'KADUNA', 'KANO', 'KATSINA', 'KEBBI', 'KOGI', 'KWARA', 'LAGOS', 'NASSARAWA', 'NIGER', 'OGUN', 'ONDO',
    'OSUN', 'OYO', 'PLATEAU', 'RIVERS', 'SOKOTO', 'TARABA', 'YOBE', 'ZAMFARA'
  ]
}

/**
* Creates a React Component
* @return {jsx} renders the register business page
* @memberof React Component
*/
handleRegisterBusinessSubmit() {

}

/**
* Creates a React Component
* @return {jsx} renders the register business page
* @memberof React Component
*/
render() {
  const categoryOptions = this.props.categories.map(category =>
    <option key={category} value={category}>{category}</option>);

  const locationOptions = this.props.locations.map(location =>
  <option key={location} value={location}>{location}</option>);

  return (
        <div className="row">
            <div className="col s12 m8 offset-m2 l8 offset-l2">
                <div className="card">
                    <div className="card-action blue lighten-1 white-text center">
                        <h3>Register a Business</h3>
                    </div>
                    <div className="card-content">
                        <form onSubmit={this.handleRegisterBusinessSubmit.bind(this)}>
                            <div className="row">
                                <div className="input-field col s12 m12 l12">
                                    <i className="material-icons prefix">business_center</i>
                                    <label htmlFor="name">Business Name</label>
                                    <input type="text" ref="name" className="validate" required/>
                                </div>
                            </div>
                        <div className="row">
                            <div className="input-field col s12 m6 l6">
                                <select ref="location" required>
                                <option disabled >Choose your location</option>
                                    {locationOptions}
                                </select>
                                <label>Location</label>
                            </div>
                            <div className="input-field col s12 m6 l6">
                                    <select ref="category" required>
                                        <option disabled >Choose your category</option>
                                        {categoryOptions}
                                    </select>
                                    <label>Category</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12 m12 l12">
                                    <i className="material-icons prefix">email</i>
                                    <label htmlFor="email">Contact Email Address</label>
                                    <input type="email" placeholder="johndoe@gmail.com" ref="email" className="validate" required/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12 m12 l12">
                                    <i className="material-icons prefix">location_on</i>
                                    <label htmlFor="address">Business Address</label>
                                    <input type="text" placeholder="Enter Business Address" ref="address" className="validate" required/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12 m12 l6">
                                    <i className="material-icons prefix">phone</i>
                                    <label htmlFor="telephoneNumber">Telephone Number</label>
                                    <input type="number" ref="telephoneNumber" className="validate" required/>
                                </div>
                                <div className="input-field col s12 m12 l6">
                                    <i className="material-icons prefix">phone</i>
                                    <label htmlFor="homeNumber">Home Number</label>

                                    <input type="number" ref="homeNumber" className="validate"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12 m12 l12">
                                    <i className="material-icons prefix">mode_edit</i>
                                    <textarea className="materialize-textarea" ref="description">
                                    </textarea>
                                    <label htmlFor="description">Business Description</label>
                                </div>
                            </div>
                            <br/>
                            <div className="input-field">
                                <button type="submit" className="btn-large waves-effect waves-dark blue lighten-1" style={{ width: `${100}%` }}>REGISTER BUSINESS</button>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col s12 m12 l6 offset-l3 center">
                                    <h6>
                                        <a href="userProfile.html">Go Back to Profile Page</a>
                                    </h6>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
  );
}
}

