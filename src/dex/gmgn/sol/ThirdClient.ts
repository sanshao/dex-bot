import axios from "axios";
import https from "https";

export interface SuoluosiBaseModel<T> {
  code: number;
  msg: string;
  count?: number;
  data: T;
}

// export interface HotListItemModel {
//   颜色: string;
//   合约: string;
//   币名: string;
//   次数: number;
//   群数: number;
//   价格: string;
//   首发市值: string;
//   市值: string;
//   Top10持仓: string;
//   持有人: string;
//   热度: string;
//   查询时间: string;
// }

class ThirdClient {
  fetchHotList = async (
    ca: string,
    token = ""
  ): Promise<SuoluosiBaseModel<any>> => {
    const url = `http://suoluosi.net/blockchain/getHotlist?page=1&limit=30&ca=${ca}&token=${token}`;

    try {
      const response = await axios.get(url, {
        headers: {
          Accept: "application/json, text/javascript, */*; q=0.01",
          "Accept-Language": "en,zh-CN;q=0.9,zh-TW;q=0.8,zh;q=0.7",
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          "Proxy-Connection": "keep-alive",
          Referer: "http://suoluosi.net/blockchain/pump_hot.html",
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
          "X-Requested-With": "XMLHttpRequest",
        },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }), // 允许不安全的证书
      });

      // console.log(response.data); // 输出获取的结果
      return response.data;
    } catch (error) {
      console.error("Error fetching fetchHotList:", error);
    }
    // @ts-ignore
    return null;
  };
}

export default new ThirdClient();
