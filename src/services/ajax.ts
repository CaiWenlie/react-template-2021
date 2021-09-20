import axios from 'axios'

const baseURL = '/api'
export const ajax = axios.create({
  baseURL: baseURL,
  method: 'post',
  timeout: 30000,
  headers: {
    'content-type': 'application/json'
  }
})
