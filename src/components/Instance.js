import Axios from 'axios'
const instance = Axios.create({
    baseURL: '',
    headers: {}
  });
  instance.get('/config.json')
  .then(res=>{
    const rdata=res.data;
    console.log("res--instance", rdata)
    instance.defaults.baseURL = rdata.UNSPLASHBASEURI
    })
    .catch(err=>{
      console.log(err);
    })
export default instance;