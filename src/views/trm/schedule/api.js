import axios from 'axios';

let base = '';

export const getScheduleList = params => { return axios.get(`${base}/CourseSchedule/list`, { params: params }); };

export const getScheduleListPage = params => { 
  return axios.get(`${base}/CourseSchedule/listpage`, { params: params }); 
};

export const removeSchedule = params => { return axios.get(`${base}/CourseSchedule/remove`, { params: params }); };

export const batchRemoveSchedule = params => { return axios.get(`${base}/CourseSchedule/batchremove`, { params: params }); };

export const editSchedule = params => { return axios.post(`${base}/CourseSchedule/edit`, { params: params }); };

export const addSchedule = params => { return axios.post(`${base}/CourseSchedule/add`, { params: params }); };