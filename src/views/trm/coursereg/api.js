import axios from 'axios';

let base = '';

export const getRegistrationList = params => { return axios.get(`${base}/CourseRegistration/list`, { params: params }); };

export const getRegistrationListPage = params => { 
  return axios.get(`${base}/CourseRegistration/listpage`, { params: params }); 
};

export const removeRegistration = params => { return axios.get(`${base}/CourseRegistration/remove`, { params: params }); };

export const batchRemoveRegistration = params => { return axios.get(`${base}/CourseRegistration/batchremove`, { params: params }); };

export const editRegistration = params => { return axios.post(`${base}/CourseRegistration/edit`, { params: params }); };

export const addRegistration = params => { return axios.post(`${base}/CourseRegistration/add`, { params: params }); };