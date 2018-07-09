import React from 'react';
import { Tabs, Tab, Modal, Pagination } from 'react-materialize';
import { Link } from 'react-router-dom';
import alertify from 'alertifyjs';
import PropTypes from 'prop-types';
import Business from '../../Businesses/presentational/Business.jsx';
import FilterBusiness from '../../Forms/FilterBusiness.jsx';

/**
 * Class Representing React Component UserProfile
 *@class UserProfile
 *@classdesc creates a React component- UserProfile
 */
export default class UserProfile extends React.Component {
  /**
    * @param {object} props props from parent class
    * @return {null} creates state and initalizes class variables
    * @memberof UserProfile Component
    */
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      info: true,
      businesses: false,
      currentPage: 1
    };
  }

  /**
   * @description - redirect unauthenticated user to the login page
   *
   * @return {void} no return or void
   */
  componentWillMount() {
    if (!this.props.usersReducer.authenticated) {
      this.props.history.push('/login');
    }
  }

  /**
   * @description - dispatches redux action to fetch users businesses
   *
   * @return {void} no return or void
   */
  componentDidMount() {
    this.props.fetchUserBusinesses(this.state.currentPage)
      .catch((error) => {
        if (error.response.status === 401 && this.props.usersReducer.authenticated) {
          alertify.set('notifier', 'position', 'top-right');
          alertify.warning('Session Expired Login again');
          this.props.logout();
          setTimeout(() => this.props.history.push('/login'), 1000);
        } else {
          this.props.fetchUserBusinessesFailed();
        }
      });
  }

  /**
      * onChange Event handler callback for filter businesses input
      * @param {string} searchText The event object
      *
      * @return {null}  Updates the component state
      * @memberof UserProfile Component
      */
     onSearchChange = (searchText) => {
       this.setState({
         search: searchText, info: false, businesses: true
       });
     };

  /**
    * onChange Event handler callback for pagination component
    * @param {object} pageNumber the page number
    *
    * @return {null} updates the state of the UserProfile component
    * @memberof UserProfile Component
    */
    onPageChange = (pageNumber) => {
      this.props.fetchUserBusinesses(pageNumber)
        .then(() => this.setState({ currentPage: pageNumber, info: false, businesses: true }));
    }

  /**
    * Renders the UserProfile Component
    * @return {jsx} jsx element to render
    * @memberof UserProfile Component
    */
    render() {
      const {
        firstname, lastname, username, email, telephoneNumber, homeNumber
      } = this.props.usersReducer.user;

      let businessId;
      const { businessesCount } = this.props.usersReducer;
      const filterBusinesses = this.props.usersReducer.businesses.filter(business =>
        business.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1);

      return (
      <div className="row formcontainer">
         <div className="col s12 m8 offset-m2 l8 offset-l2">
          <div className="card">
            <div className="card-action blue-grey darken-2 white-text center">
              <h3>My Profile</h3>
            </div>
            <div className="card-content">
              <div className="row">
                <Tabs key={`tabs${Date.now()}`} className="tab-demo z-depth-1">
                  <Tab title="Information" active={this.state.info}>
                    <div id="personal_info" className="col s12 m12 l12 ">
                      <ul className="collection">
                        <li className="collection-item avatar">
                          <i className="material-icons circle blue-grey darken-2 ">
                            account_circle
                          </i>
                          <span className="title">
                            <h5>Full Name</h5>
                          </span>
                          <p>{`${firstname} ${lastname}`}</p>
                        </li>
                        <li className="collection-item avatar">
                          <i className="material-icons circle blue-grey darken-2 ">
                            account_circle
                          </i>
                          <span className="title">
                            <h5>User Name</h5>
                          </span>
                          <p>{`${username}`}</p>
                        </li>
                        <li className="collection-item avatar">
                          <i className="material-icons circle blue-grey darken-2 ">
                            email
                          </i>
                          <span className="title">
                            <h5>Email</h5>
                          </span>
                          <p>{email}</p>
                        </li>
                        <li className="collection-item avatar">
                          <i className="material-icons circle blue-grey darken-2 ">
                            phone
                          </i>
                          <span className="title">
                            <h5>Telephone Number</h5>
                          </span>
                          <p>{telephoneNumber}</p>
                        </li>
                        <li className="collection-item avatar">
                          <i className="material-icons circle blue-grey darken-2 ">
                            phone
                          </i>
                          <span className="title">
                            <h5>Home Number</h5>
                          </span>
                          <p>{homeNumber || 'Nil'} </p>
                        </li>
                      </ul>
                    </div>
                  </Tab>
                  <Tab title="Businesses" active={this.state.businesses}>
                    <div className="col s8 l8">
                      <FilterBusiness
                       search={this.state.search} onSearchChange={this.onSearchChange}/>
                    </div>
                    <div id="businesses" className="col offset-l1 m12 s12 ">
                          {filterBusinesses.length > 0 ?
                           filterBusinesses.map((business, i) => (
                                <Business business={business} key={i}>
                                    <Link
                                     className="blue-grey-text"
                                      to={`/updateBusiness/${business.id}`}
                                    >
                                      UPDATE
                                    </Link>
                                    <a className="waves-effect red-text darken-2  waves-light btn-small" onClick={() => {
                                      businessId = business.id;
                                      $('#deleteBusiness').modal('open');
                                    }}>
                                      <i className="material-icons">delete</i>
                                    </a>
                                </Business>
                              )) : <div>
                              <h1>No Businesses !!</h1>
                        </div>}
                        <div className="col s12">
                          <Pagination
                          key={Date.now()}
                          items={Math.ceil(businessesCount / 9) || 0 }
                          activePage={this.state.currentPage}
                          maxButtons={5}
                          onSelect={this.onPageChange} />
                        </div>
                       </div>
                      <Modal
                      id="deleteBusiness"
                      header="Confirm Business Deletion"
                      actions={
                      <div>
                        <button className="confirmDelete"
                        onClick={() => {
                          this.props.deleteBusiness(businessId)
                            .then(() => {
                              alertify.set('notifier', 'position', 'top-right');
                              alertify.success('Business Deleted');
                              $('#deleteBusiness').modal('close');
                              this.props.fetchUserBusinesses(this.state.currentPage)
                              .then(() => this.setState({ info: false, businesses: true }));
                            })
                            .catch((error) => {
                              if (error.response.status === 401) {
                                alertify.set('notifier', 'position', 'top-right');
                                alertify.warning('Session Expired Login again');
                                this.props.logout();
                                setTimeout(() => this.props.history.push('/login'), 1000);
                              }
                            });
                        }}
                        >
                        DELETE
                        </button>
                        <button onClick={() => $('#deleteBusiness').modal('close')}>CLOSE</button>
                      </div>
                    }
                      >
                        <strong>DO YOU WANT TO DELETE THIS BUSINESS</strong>
                      </Modal>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
                  </div>);
    }
}

UserProfile.propTypes = {
  fetchUserBusinesses: PropTypes.func.isRequired,
  fetchUserBusinessesFailed: PropTypes.func.isRequired,
  usersReducer: PropTypes.object.isRequired,
  deleteBusiness: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

