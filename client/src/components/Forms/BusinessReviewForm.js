import React from 'react';
import alertify from 'alertifyjs';
import Errors from '../Messages/presentational/Errors';

/**
 * Class Representing React Component BusinessReviewForm
 *@class BusinessReviewForm
 *@classdesc creates a React component- BusinessReviewForm
 *@param {object} e event object
 */
export default class BusinessReviewForm extends React.Component {
  state = {
    reviewDetails: {
      review: ''
    }
  }

  /**
    * onChange Event handler callback for review response input field
    * @param {object} e the event object
    *
    * @return {null} updates the state of the BusinessReviewForm component
    * @memberof BusinessReviewForm Component
    */
  onChange = e =>
    this.setState({
      ...this.state,
      reviewDetails: { ...this.state.reviewDetails, [e.target.name]: e.target.value }
    });

  /**
      * onSubmit Event handler callback for review form
      * @param {object} e The event object
      *
      * @return {null}  Review submitted or returns error message
      * @memberof BusinessReviewForm Component
      */
  onSubmit = (e) => {
    e.preventDefault();
    this.props.submit(this.state.reviewDetails);
  }

  /**
    * Renders the BusinessReviewForm Component
    * @return {jsx} jsx element to render
    * @memberof BusinessReviewForm Component
    */
  render() {
    const { review } = this.state.reviewDetails;
    return (<div className="row">
          <form onSubmit={this.onSubmit}>
            <div className="row">
              <div className="input-field col s12 m12 l12">
                <i className="material-icons prefix">feedback</i>
                <textarea value={review} className="materialize-textarea" id="review" name="review" onChange={this.onChange} />
                <label htmlFor="review">Give Feedback about Business</label>
              </div>
            </div>
            <div className="form-field">
              <button type="submit" className="btn-large waves-effect waves-dark blue lighten-1" style={{ width: `${100}%` }}>
                POST REVIEW
              </button>
            </div>
          </form>
</div>);
  }
}
