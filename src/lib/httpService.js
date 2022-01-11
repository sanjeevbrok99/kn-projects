import axios from 'axios';

const httpService = axios.create({
  baseURL: 'https://application-knmulti.herokuapp.com/api/v1',
});

httpService.defaults.headers[''] = 5; /// we will pass the authorizaion here

export default httpService;
