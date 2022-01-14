import axios from 'axios';

const httpService = axios.create({
  baseURL: 'https://kn-multiprojects-sr2zq.ondigitalocean.app/api/v1/',
});

export default httpService;
