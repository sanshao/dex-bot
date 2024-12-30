import axios, { AxiosInstance, AxiosRequestHeaders } from "axios";
import cryptoJS from "crypto-js";
import { ApiConfigModel, OkxBaseModel } from "./OkxModel";

export class OkxClient {
  axiosInstance: AxiosInstance;

  constructor(apiConfig: ApiConfigModel) {
    const axiosInstance = axios.create({
      baseURL: apiConfig.baseUrl || "https://www.okx.com",
      timeout: 6 * 10 ** 3,
    });

    axiosInstance.interceptors.request.use(
      (config) => {
        const date = new Date();
        const timestamp = date.toISOString();
        let { method = "GET", params, data } = config;
        method = method?.toUpperCase();
        let query_string = "";
        if (method === "GET" && params) {
          // query_string = "?" + new URLSearchParams(params).toString();
          config.url += "?" + new URLSearchParams(params).toString();
          config.params = undefined;
        } else if (method === "POST" && data) {
          query_string = JSON.stringify(data);
        }
        console.log("method", method, config.url);
        const headers = {
          ...config.headers,
          "Content-Type": "application/json",
          "OK-ACCESS-KEY": apiConfig.apiKey,
          "OK-ACCESS-SIGN": cryptoJS.enc.Base64.stringify(
            cryptoJS.HmacSHA256(
              timestamp + method + config.url + query_string,
              apiConfig.secretKey
            )
          ),
          "OK-ACCESS-TIMESTAMP": timestamp,
          "OK-ACCESS-PASSPHRASE": apiConfig.passphrase,
        };

        // @ts-ignore
        config.headers = headers;
        return config;
      },
      (error) => {
        console.error(error);
        return Promise.reject(error);
      }
    );

    axiosInstance.interceptors.response.use(
      (response) => {
        return response?.data || {};
      },
      (error) => {
        console.error(error);
        return {};
      }
    );

    this.axiosInstance = axiosInstance;
  }

  get(
    api: string,
    queryParams: Record<string, any>
  ): Promise<OkxBaseModel<any>> {
    return this.axiosInstance.get(api, { params: queryParams });
  }

  post(api: string, data: any): Promise<OkxBaseModel<any>> {
    return this.axiosInstance.post(api, data);
  }
}
