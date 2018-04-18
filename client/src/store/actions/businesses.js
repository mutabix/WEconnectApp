import axios from 'axios';
import { FETCH_BUSINESSES, FETCH_BUSINESS, SET_BUSINESS_PROFILE, REGISTER_BUSINESS, UPDATE_BUSINESS } from './actionTypes';


export const registerBusiness = () => ({
  type: REGISTER_BUSINESS
});

export const updatesBusiness = () => ({
  type: UPDATE_BUSINESS
});

export const deletesBusiness = () => ({
  type: UPDATE_BUSINESS
});

export const setBusinessProfile = business => ({
  type: SET_BUSINESS_PROFILE,
  business
});

export const fetchBusinesses = () => dispatch =>
  axios.get('api/v1/businesses')
    .then((response) => {
      dispatch({
        type: FETCH_BUSINESSES,
        businessList: response.data
      });
    })
    .catch(error => Promise.reject(error.response.data.message));

export const createBusiness = businessDetails => dispatch =>
  axios.post('api/v1/businesses', businessDetails)
    .then((response) => {
      dispatch(registerBusiness());
    });

export const updateBusiness = (businessId, businessDetails) => dispatch =>
  axios.put(`api/v1/businesses/${businessId}`, businessDetails)
    .then((response) => {
      dispatch(updatesBusiness());
    });

export const deleteBusiness = businessId => dispatch =>
  axios.delete(`api/v1/businesses/${businessId}`)
    .then((response) => {
      dispatch(deletesBusiness());
    });

export const fetchBusiness = businessId => dispatch =>
  axios.get(`api/v1/businesses/${businessId}`)
    .then((response) => {
      dispatch(setBusinessProfile(response.data.business));
    })
    .catch(error => Promise.reject(error.response.data.message));

