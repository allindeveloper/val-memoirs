import Axios from 'axios'
const HomeInstance = Axios.create({
    baseURL: '',
    headers: {}
  });
  HomeInstance.get('/config.json')
  .then(res=>{
    const rdata=res.data;
    console.log("res--instance", rdata)
    HomeInstance.defaults.baseURL = rdata.SERVICEBASEURI
    })
    .catch(err=>{
      console.log(err);
    })
export default HomeInstance;