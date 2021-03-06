import { SET_BUSINESS_PROFILE, FETCH_BUSINESS_FAILED, FETCH_BUSINESS_REVIEWS, FETCH_BUSINESS_REVIEWS_FAILED, POST_REVIEW, UPDATE_REVIEW, DELETE_REVIEW } from '../actions/actionTypes';

const initialState = {
  business: {},
  reviews: [],
  reviewsCount: 0,
  reviewSubmitted: false,
  reviewUpdated: false,
  reviewDeleted: false
};

/**
    * Listens to actions and dispatches new state for the application
    * @param {object} state current state of the application
    * @param {object} action redux action object
    *
    * @return {object} the state of the application
    */
function businessProfile(state = initialState, action) {
  switch (action.type) {
    case SET_BUSINESS_PROFILE:
      return { ...state, business: action.business };

    case FETCH_BUSINESS_FAILED:
      return { ...state, business: {} };

    case FETCH_BUSINESS_REVIEWS:
      return { ...state, reviews: action.reviews, reviewsCount: action.reviewsCount };

    case FETCH_BUSINESS_REVIEWS_FAILED:
      return { ...state, reviews: [], reviewsCount: 0 };

    case POST_REVIEW:
      return { ...state, reviewSubmitted: true };

    case UPDATE_REVIEW:
      return { ...state, reviewUpdated: true };

    case DELETE_REVIEW:
      return { ...state, reviewDeleted: true };

    default:
      return state;
  }
}

export default businessProfile;
