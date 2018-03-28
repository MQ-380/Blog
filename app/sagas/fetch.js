import axios from 'axios'

let config = {
  baseURL: '/api',
  transformRequest: [
    function (data) {
      let ret = ''
      for (let it in data) {
        ret +=
          encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret;
    }
  ],
  transformResponse: [data => data],
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  },
  timeout: 10000,
  response: 'json'
};

axios.interceptors.response.use(res => res.data)

export function get(url) {
  return axios.get(url, config);
}

export function post(url, data) {
  return axios.post(url, data, config)
}
