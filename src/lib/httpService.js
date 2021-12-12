import axios from 'axios';

const httpService = axios.create({
  baseURL: 'https://application-knmulti.herokuapp.com/api/v1',
});

export default httpService;
