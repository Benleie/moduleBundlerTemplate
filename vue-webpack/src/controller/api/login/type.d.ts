/** 用户信息 */
export type UserInfo = {
  /** 邮箱 */
  email: string;
  /** 用户id */
  id: number;
  /** 姓名 */
  name: string;
  /** 手机号 */
  phone: string;
  /**
   * @管理员 所属子公司 id（总部 = '0'）
   * @供应商 直连子公司 id（总部 = '0'）
   */
  providerId: string;
  /** 类型, 1 内部, 2 外部 */
  type: AccountType;
  /** 账号 */
  userName: string;
};

/** 账号类型 */
declare enum AccountType {
  /** 内部账号（管理员） */
  INNER = 1,
  /** 外部账号（供应商） */
  OUTER,
}

/** 获取账号权限 data */
export type GetAuthResponse = {
  /** 菜单权限 */
  modules: string[];
  /** 用户信息 */
  userInfo: UserInfo;
};
