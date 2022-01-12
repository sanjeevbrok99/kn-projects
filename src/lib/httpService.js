import axios from 'axios';

const httpService = axios.create({
  baseURL: 'http://128.199.25.12:3000/api/v1/',
});

export default httpService;
