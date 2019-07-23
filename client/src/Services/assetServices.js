import axios from 'axios';

export default class assetServices {
  constructor(){
    this.service = axios.create({
      baseURL: 'http://localhost:5000',
      withCredentials: true
    })
  }

  assets = () => {
    return this.service.get('/assets')
    .then(response => response.data)
  }
}