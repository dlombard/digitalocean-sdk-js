import axios, { AxiosInstance } from 'axios'

export default function newClient(apiToken: string) {

  var httpClient =  axios.create({
    baseURL: 'https://api.digitalocean.com/v2',
    headers: { 'Authorization': `Bearer ${apiToken}` }
  });

  httpClient.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
    var e = {
      status: error.response.status,
      statusText: error.response.statusText,
      headers: error.response.headers,
      message: error.response.data.message
  }
    return Promise.reject(e);
  });

  return httpClient
}

