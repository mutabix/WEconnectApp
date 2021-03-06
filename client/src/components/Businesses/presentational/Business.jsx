import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactStars from 'react-stars';
import getAverageRating from '../../../utils/getAverageRating';

const Business = (props) => {
  const {
    businessImage, name, location, category, reviews, id
  } = props.business;
  return (
  <div className="col s12 m6 l4">
      <div className="card hoverable">
        <div className="card-image">
          <img className="responsive" src={businessImage} alt="business" />
          <span className="card-title"></span>
        </div>
        <div className="card-content business-body">
          <p className="truncate">Business Name: {name} </p>
          <p className="truncate">Location: {location} </p>
          <p className="truncate">Category: {category} </p>
          <div className="review-count"><span><ReactStars className="business-rating" count={5}
          size={15}
          half={true}
          edit={false}
          color2={'#ffd700'}
          value={Number(getAverageRating(reviews))} /> {reviews.length} <i className="person-count material-icons">person</i></span>
        </div>
        </div>
        <div className="card-action">
          <Link className="blue-grey-text darken-2 view" to={`/businessProfile/${id}`}>View</Link>
          {props.children}
        </div>
      </div>
  </div>
  );
};

export default Business;

Business.propTypes = {
  business: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    businessImage: PropTypes.string,
    location: PropTypes.string.isRequired,
    reviews: PropTypes.array.isRequired
  }).isRequired,
};

