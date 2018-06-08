import DigitalOcean from './lib/do'
import HttpClient from './lib/http/httpclient'
import { AxiosInstance } from 'axios';



export function init(apiToken: string): DigitalOcean {

  const httpClient: AxiosInstance = HttpClient(apiToken)
  const doClient = new DigitalOcean(httpClient)

  return doClient
}