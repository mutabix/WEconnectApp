import React from 'react';
import alertify from 'alertifyjs';
import PropTypes from 'prop-types';
import BusinessUpdateForm from '../../Forms/BusinessUpdateForm.jsx';
import FormErrors from '../../Messages/presentational/FormErrors.jsx';

/**
 * Class Representing React Component UpdateBusiness
 *@class UpdateBusiness
 *@classdesc creates a React component- UpdateBusiness
 */
export default class UpdateBusiness extends React.Component {
    state = {
      errors: {
        message: null,
        conflict: null
      },
      disableBtn: false
    }

  /**
   * @description - Redirects unauthenticated users to the login page
   *
   * @return {void} no return or void
   */
    componentWillMount() {
      const { authenticated } = this.props.usersReducer;
      if (authenticated !== true) {
        this.props.history.push('/login');
      }
    }

  /**
   * @description - dispatches the redux action to fetch business categories
   *
   * @return {void} no return or void
   */
    componentDidMount() {
      this.props.fetchCategories();
      this.props.fetchBusiness(this.props.match.params.id);
    }

    /**
      * onSubmit Event handler callback for UpdateBusiness form
      * @param {object} businessDetails The Business Details object
      *
      * @return {null}  Business Updated message or returns error message
      * @memberof UpdateBusiness Component
      */
    onSubmit = (businessDetails) => {
      this.setState({ disableBtn: true });
      this.props.updateBusiness(this.props.match.params.id, businessDetails)
        .then((response) => {
          alertify.set('notifier', 'position', 'top-right');
          alertify.success('Business Updated Successfully');
          setTimeout(() => this.props.history.push(`/businessProfile/${this.props.match.params.id}`), 2000);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.warning('Session Expired Login again');
            this.props.logout();
            setTimeout(() => this.props.history.push('/login'), 1000);
            return;
          }
          window.scroll(0, 0);
          if (error && error.response.data.validationErrors) {
            return this.setState({
              errors:
          { ...this.state.errors, message: error.response.data.validationErrors },
              disableBtn: false
            });
          }
          return this.setState({
            errors:
        { ...this.state.errors, conflict: error.response.data.message },
            disableBtn: false
          });
        });
    }

  /**
    * Renders the UpdateBusiness Component
    * @return {jsx} jsx element to render
    * @memberof UpdateBusiness Component
    */
    render() {
      const { categories } = this.props.businesses;
      const { business } = this.props.businessProfile;
      const { errors, disableBtn } = this.state;
      return (<div className="row formcontainer container">
          <div className="col s12 m8 offset-m2 l8 offset-l2">
            <div className="card">
              <div className="card-action blue-grey darken-2 white-text center">
                <h3>Update a Business</h3>
              </div>
              <div className="card-content">
              <FormErrors errors={errors} />
              <BusinessUpdateForm business={business}
               categories={categories} submit={this.onSubmit}
               disableBtn={disableBtn}/>
            </div>
          </div>
        </div>
    </div>);
    }
}

UpdateBusiness.propTypes = {
  fetchCategories: PropTypes.func.isRequired,
  updateBusiness: PropTypes.func.isRequired,
  businesses: PropTypes.object.isRequired,
  usersReducer: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
