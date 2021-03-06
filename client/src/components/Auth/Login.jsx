import React from 'react';
import PropTypes from 'prop-types';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import LoginForm from '../Forms/LoginForm.jsx';

/**
 * A class to represent the React Login Component
 *@class Login
 *@classdesc creates a React component- Login
 */
export default class Login extends React.Component {
    state = {
      message: null,
      disableBtn: false
    }

  /**
   * @description - Redirects authenticated users to the user profile page
   *
   * @return {void} no return or void
   */
    componentWillMount() {
      const { authenticated } = this.props.usersReducer;
      if (authenticated) {
        this.props.history.push('/userProfile');
      }
    }

    /**
      * onSubmit Event handler callback for login form
      * @param {object} credentials The event object
      *
      * @return {null}  user profile component if successful or returns error message
      * @memberof Login Component
      */
    onSubmit = (credentials) => {
      this.props.login(credentials)
        .then(() => {
          this.setState({ disableBtn: true });
          NotificationManager.success('Login Successful Welcome Back!!', 'Successful');
          setTimeout(() => this.props.history.push('/userProfile'), 2000);
        })
        .catch((err) => {
          this.setState({ message: err.response.data.message, disableBtn: false });
        });
    }

  /**
    * Renders the Login Component
    * @return {jsx} jsx element to render
    * @memberof Login Component
    */
    render() {
      const { message, disableBtn } = this.state;
      return (<div className="row bg-image loginformcontainer container">
          <div className="col s12 m8 offset-m2 l6 offset-l3">
            <div className="card">
              <div className="card-action blue-grey darken-2 white-text center">
                <h3>Login</h3>
              </div>
              <div className="card-content">
                {message ? <ul className="collection with-header">
                    <li key="header" className="collection-header">
                      <h4 className="red-text">Something Went Wrong</h4>
                    </li>
                    <li key="error" className="collection-item"><span className="red-text">{message}</span></li>
                  </ul> : null}
              <LoginForm submit={this.onSubmit} disableBtn={disableBtn} />
            </div>
            <NotificationContainer/>
            </div>
          </div>
    </div>);
    }
}

Login.propTypes = {
  usersReducer: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};
