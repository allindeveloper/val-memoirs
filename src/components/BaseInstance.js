import Axios from 'axios'
const instance = Axios.create({
    baseURL: 'https://val-memoirs-api-service.herokuapp.com/',
    headers: {}
  });
export default instance;