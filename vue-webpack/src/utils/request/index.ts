/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, Method } from 'axios';
import { RequestInstance } from './config';
import { setInterceptor, generateOptions, responseHandler } from './handler';

// 超时分钟数
const TIMEOUT = 5;
const service = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/meteor-dev-api' : '',
  timeout: TIMEOUT * 60 * 1000,
});
setInterceptor(service);

console.log('hhh', 'hhh'.trimEnd());
console.log('hhh'.trimEnd());

console.log('process.env.NODE_ENV', process.env.NODE_ENV);

function request(
  options: RequestInstance,
  method: Method | 'upload' | 'download',
): Promise<any> {
  const axiosOptions: AxiosRequestConfig = generateOptions(options, method);
  return new Promise((resolve, reject) => {
    service
      .request(axiosOptions)
      .then((response) => {
        const ignoreCode = method === 'download';
        responseHandler(response, resolve, reject, ignoreCode);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
}

const post = function (options: RequestInstance): Promise<any> {
  options.method = 'post';
  return request(options, 'post');
};

export { post };
