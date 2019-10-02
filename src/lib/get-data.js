import store from '@/store'
import axios from 'axios'
import config from '../../config'

const getData = (path, payload) => {
  const token = store.state.oidcStore.access_token
  const options = {
    headers: {
      Autorization: `Bearer ${token}`
    },
    method: payload ? 'post' : 'get',
    url: config.apiUrl + path,
    data: payload
  }
  return axios(options)
}

export default getData
