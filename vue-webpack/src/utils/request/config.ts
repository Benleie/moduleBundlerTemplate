// eslint-disable-next-line @typescript-eslint/no-explicit-any
export declare type PromiseCallback = (value: any) => any;

declare interface FileConfig {
  type?: string;
  name?: string;
}

export declare interface RequestInstance {
  params?: object;
  url: string;
  fileConfig?: FileConfig;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propName: string]: any;
}

/** 接口响应状态码 */
export enum STATUS_CODE {
  /** token 无效 */
  UNAUTHORIZED = 401,
}

/** 接口响应 code */
export const enum RESPONSE_CODE {
  SUCCESS = 40001, // 成功
  NO_LOGIN = 40005, // 未登录
  ACCESS_DENIED = 40006, // 无权限
  EXPIRED = 40007, // token已经过期
  CHANGE_PASSWORD = 40008, // 修改密码
  UPGRADE = 400013, // 强制更新
}
