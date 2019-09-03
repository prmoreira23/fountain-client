import axios from 'axios';
import snakeCaseKeys from 'snakecase-keys';

import { headers } from '../utils/auth';

export const getJobOpenings = (params = {}) => {
  const url = `${process.env.REACT_APP_API_URL}/job_openings`;
  return axios.get(url, { params, ...headers()})
    .then(response => response.data);
};

export const getJobOpening = (id) => {
  const url = `${process.env.REACT_APP_API_URL}/job_openings/${id}`;
  return axios.get(url, headers())
    .then(response => response.data);
};

export const applyToJobOpening = (id) => {
  const url = `${process.env.REACT_APP_API_URL}/job_openings/${id}/apply_to_job`;
  return axios.post(url, {}, headers())
    .then(response => response.data);
};

export const getLastestJobOpenings = () => {
  const url = `${process.env.REACT_APP_API_URL}/job_openings/latest_jobs`;
  return axios.get(url, headers())
    .then(response => response.data);
};

export const createJobOpening = (data) => {
  const url = `${process.env.REACT_APP_API_URL}/job_openings`;
  return axios.post(url, snakeCaseKeys(data), headers())
    .then(response => response.data);
};

export const updateJobOpening = (data) => {
  const params = {...data};
  delete params.id;
  const url = `${process.env.REACT_APP_API_URL}/job_openings/${data.id}`;
  return axios.put(url, snakeCaseKeys(params), headers())
    .then(response => response.data);
};
