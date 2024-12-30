export interface ApiConfigModel {
  apiKey: string;
  secretKey: string;
  passphrase: string;
  projectId?: string;
  baseUrl?: string; // 默认https://www.okx.com
}

export interface OkxBaseModel<T> {
  code: string;
  msg: string;
  data: T;
}
