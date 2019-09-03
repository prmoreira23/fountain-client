import axios from 'axios';

import { headers } from '../utils/auth';

export default class AuthAdapter {
  static login (loginParams) {
    return axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, loginParams, headers())
      .then(response => response.data);
  }

  static currentUser () {
    return axios.get(`${process.env.REACT_APP_API_URL}/users`, headers())
      .then(response => response.data);
  }
}
