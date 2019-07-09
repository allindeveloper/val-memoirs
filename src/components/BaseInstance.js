import Axios from 'axios'
const baseInstance = Axios.create({
    baseURL: 'https://val-memoirs-api-service.herokuapp.com/',
    headers: {}
  });
export default baseInstance;