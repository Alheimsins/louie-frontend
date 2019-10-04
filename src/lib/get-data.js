import store from '@/store'
import axios from 'axios'
import config from '../../config'

const instance = axios.create({
  baseURL: config.apiUrl,
  timeout: 5000
})

const getData = (path, payload) => {
  const options = {
    headers: {
      Authorization: `Bearer ${store.state.oidcStore.access_token}`
    }
  }

  return payload
    ? instance.post(path, payload, options)
    : instance.get(path, options)
}

export default getData
