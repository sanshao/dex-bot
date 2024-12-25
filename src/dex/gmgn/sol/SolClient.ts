import axios from "axios";
import {
  TokenDevInfoModel,
  TokenHolderStatModel,
  TokenInfoModel,
  TokenInfoModelFromPageProps,
  TokenLaunchpadInfoModel,
  TokenLinkInfoModel,
  TokenPoolInfoModel,
  TokenRugInfoModel,
  TokenSecurityInfoModel,
} from "./model/SolModel";
import { AxiosInstance, GmgnBaseModel } from "../Base";

class SolClient {
  async getTokenInfoByPage(
    ca: string
  ): Promise<GmgnBaseModel<TokenInfoModelFromPageProps> | null> {
    const url = `https://gmgn.ai/sol/token/${ca}`;
    // 启动浏览器
    // const response = await axios.get(url);
    const response = await AxiosInstance.get(url);
    const html = response.data;

    try {
      const regex =
        /<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/s;
      const match = html.match(regex);
      if (match && match[1]) {
        const jsonString = match[1];

        try {
          // 解析 JSON 数据
          const jsonData = JSON.parse(jsonString);
          if (
            jsonData.props &&
            jsonData.props.pageProps &&
            jsonData.props.pageProps.tokenInfo
          ) {
            return jsonData.props.pageProps.tokenInfo;
          }
          return null;
        } catch (error) {
          console.error("JSON 解析错误:", error);
        }
      } else {
        console.log("未找到 JSON 数据");
      }
    } catch (error) {
      console.error(error);
    }

    return null;
  }

  getTokenInfo(ca: string): Promise<GmgnBaseModel<TokenInfoModel>> {
    return AxiosInstance.get(`/api/v1/token_info/sol/${ca}`);
  }

  getTokenPoolInfo(ca: string): Promise<GmgnBaseModel<TokenPoolInfoModel>> {
    return AxiosInstance.get(`/api/v1/token_pool_info_sol/sol/${ca}`);
  }

  getTokenDevInfo(ca: string): Promise<GmgnBaseModel<TokenDevInfoModel>> {
    return AxiosInstance.get(`/api/v1/token_dev_info/sol/${ca}`);
  }

  getTokenSecurityInfo(
    ca: string
  ): Promise<GmgnBaseModel<TokenSecurityInfoModel>> {
    return AxiosInstance.get(`/api/v1/token_security_sol/sol/${ca}`);
  }

  getTokenLauchpadInfo(
    ca: string
  ): Promise<GmgnBaseModel<TokenLaunchpadInfoModel>> {
    return AxiosInstance.get(`/api/v1/token_launchpad_info/sol/${ca}`);
  }

  getTokenLinks(ca: string): Promise<GmgnBaseModel<TokenLinkInfoModel>> {
    return AxiosInstance.get(`/api/v1/token_links/sol/${ca}`);
  }

  getTokenRugInfo(ca: string): Promise<GmgnBaseModel<TokenRugInfoModel>> {
    return AxiosInstance.get(`/api/v1/token_rug_info/sol/${ca}`);
  }

  getTokenHolderStatus(
    ca: string
  ): Promise<GmgnBaseModel<TokenHolderStatModel>> {
    return AxiosInstance.get(`/api/v1/token_holder_stat/sol/${ca}`);
  }
}

export default new SolClient();