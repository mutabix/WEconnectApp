import React from 'react';
import alertify from 'alertifyjs';


/**
 * Class Representing React Component ReviewResponseForm
 *@class ReviewResponseForm
 *@classdesc creates a React component- ReviewResponseForm
 *@param {object} e event object
 */
export default class ReviewResponseForm extends React.Component {
  state = {
    response: {
      message: ''
    },
  }

  /**
    * onChange Event handler callback for review response input field
    * @param {object} e the event object
    *
    * @return {null} updates the state of the ReviewResponseForm component
    * @memberof ReviewResponseForm Component
    */
  onChange = e =>
    this.setState({
      ...this.state,
      response: { ...this.state.response, [e.target.name]: e.target.value }
    });

  onSubmit = (e) => {
    e.preventDefault();
    this.props.submit(this.state.response);
  }

  /**
    * Renders the ReviewResponseForm Component
    * @return {jsx} jsx element to render
    * @memberof ReviewResponseForm Component
    */
  render() {
    return <div className="row">
        <form onSubmit={this.onSubmit}>
          <input type="text" name="message" minLength="2" value={this.state.response.message} onChange={this.onChange} required />
          <button type="submit">SUBMIT</button>
        </form>
      </div>;
  }
}
