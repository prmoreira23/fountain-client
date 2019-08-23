import axios from 'axios';
import snakeCaseKeys from 'snakecase-keys';

export const login = (data) => {
  const url = `${process.env.REACT_APP_API_URL}/auth/login`;
  return axios.post(url, snakeCaseKeys(data))
    .then(response => response.data);
};
