import axios from "axios";

export interface GmgnBaseModel<T> {
  code: number;
  reason: string;
  message: string;
  data: T;
}

export interface GmgnBaseListModel<T> {
  code: number;
  reason: string;
  message: string;
  data: {
    list: T;
  };
}

const AxiosInstance = axios.create({
  baseURL: "https://gmgn.ai",
  timeout: 10000,
});

AxiosInstance.interceptors.response.use(
  (response) => {
    return response?.data || {};
  },
  (error) => {
    console.error(error);
    return {};
  }
);

export { AxiosInstance };
