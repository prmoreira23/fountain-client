import axios from 'axios';
import snakeCaseKeys from 'snakecase-keys';

import { headers } from '../utils/auth';

export const getApplications = (params = {}) => {
  const url = `${process.env.REACT_APP_API_URL}/job_applications`;
  return axios.get(url, { params, ...headers()})
    .then(response => response.data);
};
