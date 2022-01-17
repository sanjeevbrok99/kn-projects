import axios from 'axios';

const httpService = axios.create({
  baseURL: 'https://kn-multiprojects-tldi7.ondigitalocean.app/api/v1/',
});

export default httpService;
