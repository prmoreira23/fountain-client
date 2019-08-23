import axios from 'axios';
import snakeCaseKeys from 'snakecase-keys';

export const createUser = (data) => {
  const url = `${process.env.REACT_APP_API_URL}/users`;
  return axios.post(url, snakeCaseKeys(data))
    .then(response => response.data);
};
