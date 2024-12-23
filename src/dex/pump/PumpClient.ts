import axios from "axios";
import { TokenInfoModel, UserCreatedCoinsItemModel } from "./Model";


const AxiosInstance = axios.create({
  baseURL: "https://frontend-api.pump.fun",
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

class PumpClient {

  getTokenInfo(ca: string): Promise<TokenInfoModel> {
    return AxiosInstance.get(`/coins/${ca}`);
  }

  userCreatedCoins(params: {
    ca: string;
    offset?: number;
    limit?: number;
    includeNsfw?: boolean;
  }): Promise<UserCreatedCoinsItemModel[]> {
    const { ca, offset = 0, limit = 10, includeNsfw = false } = params;
    return AxiosInstance.get(`/coins/user-created-coins/${ca}`, { params: { offset, limit, includeNsfw } });
  }
}

export default new PumpClient();
