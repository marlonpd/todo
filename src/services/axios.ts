import axios, { AxiosRequestConfig } from 'axios';
import JwtService from './jwt';

// axios.defaults.headers.common['Content-Type'] = 'application/json';
// axios.defaults.headers.common['Accept'] = 'application/json';

//create axios client and set base api URL
const client = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});


export const runGet = (resource: string) => {
  return client.get(resource).catch((error) => {
    throw new Error(`Api ${error}`);
  });
};

export const runPost = (
  resource: string,
  params: Record<string, any>,
  config?: AxiosRequestConfig | undefined
) => {
  return client.post(resource, params, config);
};

export const setHeader = () => {

  if (JwtService.getToken()) {
    client.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${JwtService.getToken()}`;
  }
};

export default client;  