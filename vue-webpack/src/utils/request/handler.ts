/* eslint-disable @typescript-eslint/no-explicit-any */
import router from '@/controller/router';
import {
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
  Method,
} from 'axios';
import { getToken } from '../auth';
import { logout } from '../logout';
import {
  PromiseCallback,
  RequestInstance,
  RESPONSE_CODE,
  STATUS_CODE,
} from './config';

function readBlobToJson(blob: Blob): Promise<any> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(blob, 'utf-8');
    reader.onload = function () {
      const getResult = reader.result;
      if (getResult && typeof getResult === 'string') {
        resolve(JSON.parse(getResult));
      } else {
        reject();
      }
    };
  });
}

function errorToast(error: string): void {
  ElMessage({
    message: error,
    type: 'error',
  });
}

export function setInterceptor(service: AxiosInstance) {
  service.interceptors.request.use(
    (config: any) => {
      const token = getToken();
      config.headers['Content-Type'] = 'application/json';
      config.headers.token = token || '';
      if (config.method === 'upload') {
        config.method = 'post';
        config.headers['Content-Type'] = 'multipart/form-data;charset=UTF-8';
      }
      return config;
    },
    (error: any): void => {
      Promise.reject(error);
    },
  );

  service.interceptors.response.use(
    (response: any) => {
      return response;
    },
    (error: any): any => {
      if (
        error.code === 'ECONNABORTED' &&
        error.message.indexOf('timeout') !== -1
      ) {
        errorToast('请求超时！');
      }
      return error.response;
    },
  );
}

export function generateOptions(
  options: RequestInstance,
  method: Method | 'upload' | 'download',
): AxiosRequestConfig {
  if (!options.params) {
    options.params = {};
  }
  method = method || 'post';
  const axiosOptions: AxiosRequestConfig = {
    method: options.method,
    url: options.url,
    responseType: options.responseType || 'json',
  };
  switch (method) {
    case 'get':
      axiosOptions.params = options.params;
      break;
    case 'post':
    case 'download':
      axiosOptions.data = options.params;
      break;
    case 'upload': {
      const form = new FormData();
      for (const [key, value] of Object.entries(options.params)) {
        form.append(key, value);
      }
      axiosOptions.data = form;
      break;
    }
  }
  return axiosOptions;
}

/**
 * 处理响应结果
 * @param response 响应数据
 * @param resolve
 * @param reject
 * @param ignoreCode 忽略 data.code 的状态，直接获取 response.data
 */
export async function responseHandler(
  response: AxiosResponse,
  resolve: PromiseCallback,
  reject: PromiseCallback,
  ignoreCode: boolean,
): Promise<void> {
  const status = response.status;
  let resData = response.data;
  if (status === 200) {
    if (ignoreCode) {
      /* download 文件的时候 */
      const isJson = resData.type && resData.type === 'application/json';
      /* 文件流的时候直接返回文件流 */
      if (!isJson) return resolve(resData);
      /*   返回错误信息时返回 json */
      resData = await readBlobToJson(resData);
    }
    // resolve(data)
    const code: number | string = resData.code;
    const data = resData.data;
    switch (Number(code)) {
      case RESPONSE_CODE.SUCCESS: {
        resolve(data);
        break;
      }
      case RESPONSE_CODE.NO_LOGIN: {
        errorToast(resData.message || '请重新登录');
        logout();
        reject(data);
        break;
      }
      case RESPONSE_CODE.ACCESS_DENIED:
      case RESPONSE_CODE.EXPIRED:
        errorToast('无权限或token已经过期');
        logout();
        reject(data);
        // force logout
        break;
      case RESPONSE_CODE.UPGRADE: {
        reject(data);
        errorToast(resData.message || 'error');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        break;
      }
      case RESPONSE_CODE.CHANGE_PASSWORD: {
        router.push('/password/set');
        reject(resData);
        break;
      }
      default: {
        errorToast(resData.message || 'error');
        reject(data);
      }
    }
  } else if (status === STATUS_CODE.UNAUTHORIZED) {
    errorToast('无权限或 token 已经过期');
    logout();
    reject(resData);
  } else if (status === 404) {
    errorToast('404 not found');
    reject(resData);
  } else {
    errorToast(resData.message || 'error');
    reject(resData);
  }
}
