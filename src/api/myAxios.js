import axios from "axios";
import {
  Message
} from 'element-ui'



const instance = axios.create({
  baseURL: 'http://127.0.0.1:8888/api/private/v1/',
  timeout: 5000
})

instance.interceptors.request.use((config) => {

  let token = window.sessionStorage.getItem('token_key');

  if (token) {

    config.headers['Authorization'] = token

  }

  return config
})


instance.interceptors.response.use((response) => {

  let data = response.data

  if (data.meta.status == 200) {
    Message({
      message: data.meta.msg,
      type: 'success'
    });
    return data.data
  } else if (data.meta.status == 400) {

    Message.error(data.meta.msg)

    return new Promise(() => {})
  }



  return response.data

}, (error) => {



  return new Promise(() => {})
})


export default instance
