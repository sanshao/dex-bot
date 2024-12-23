import BigNumber from "bignumber.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import SolClient from "./SolClient";
import ThirdClient from "./ThirdClient";

dayjs.extend(utc);
dayjs.extend(timezone);

class SolMessage {
  formatNumber = (value: string, decimals = 2) => {
    const number = new BigNumber(value);

    if (number.isNaN()) {
      return "Invalid number: value is NaN";
    }

    if (number.isLessThan(1000)) {
      return number.toFixed(decimals); // 小于千的直接返回，保留两位小数
    } else if (number.isLessThan(1e6)) {
      return `${number.dividedBy(1000).toFixed(decimals)}K`; // 千的表示
    } else if (number.isLessThan(1e9)) {
      return `${number.dividedBy(1e6).toFixed(decimals)}M`; // 百万的表示
    } else {
      return `${number.dividedBy(1e9).toFixed(decimals)}B`; // 十亿的表示
    }
  };

  raisePercentage = (oldPrice: string, price: string) => {
    if (!price || !oldPrice) {
      return "0.00%";
    }
    return `${new BigNumber(price)
      .minus(oldPrice)
      .dividedBy(oldPrice)
      .times(100)
      .toFixed(2)}%`;
  };

  isValidSolanaAddress = (address: string) => {
    const solanaAddressRegex = /^[1-9A-HJ-NP-Za-km-z]{43,44}$/;
    return solanaAddressRegex.test(address);
  };

  getTokenTemplate = (tokenData: any) => {
    let arr = [`🎗️币种: ${tokenData.symbol}(${tokenData.name})`];
    arr.push(
      `⏰创建时间: ${dayjs(tokenData.creation_timestamp * 1000)
        .tz("Asia/Shanghai")
        .format("YY-MM-DD HH:mm:ss")}`
    );
  
    if (tokenData.open_timestamp > 0) {
      arr.push(
        `🕗发射时间: ${dayjs(tokenData.open_timestamp * 1000)
          .tz("Asia/Shanghai")
          .format("YY-MM-DD HH:mm:ss")}`
      );
    } else if (tokenData.launchpad_progress) {
      arr.push(
        `🕗发射时间: ${new BigNumber(tokenData.launchpad_progress)
          .times(100)
          .toFixed(2)}%`
      );
    }
  
    arr.push(`💰价格: ${tokenData.price}`);
    arr.push(`💹市值: ${this.formatNumber(tokenData.market_cap)}`);

    arr.push(
      `👥持有人: ${tokenData.holder_count} ${
        tokenData.insider_percentage
          ? `(🐭老鼠仓${new BigNumber(tokenData.insider_percentage)
              .times(100)
              .toFixed(2)}%)`
          : ""
      }`
    );
    arr.push(
      `🔥热度等级: ${tokenData.hot_level || ""} ${
        tokenData.groupCount ? `(${tokenData.groupCount}个群)` : ""
      } ${tokenData.queryCount ? `(${tokenData.queryCount}次查询)` : ""}`
    );
    arr.push(`👶Dev持仓量: ${this.formatNumber(tokenData.creator_token_balance)}`);
    arr.push(
      `🐋Top10持仓: ${new BigNumber(tokenData.top_10_holder_rate)
        .times(100)
        .toFixed(2)}%`
    );
    arr.push(`💧池子: ${this.formatNumber(tokenData.liquidity)}`);
  
    arr.push(`💵1H成交额: ${this.formatNumber(tokenData.volume_5m)} `);
    arr.push(`💸24H成交额: ${this.formatNumber(tokenData.volume_24h)} `);
  
    // arr.push("\n");
    arr.push(
      `⌛️1M: ${this.raisePercentage(
        tokenData.price_1m,
        tokenData.price
      )}   5M: ${this.raisePercentage(tokenData.price_5m, tokenData.price)}`
    );
    arr.push(
      `⏳1H: ${this.raisePercentage(
        tokenData.price_1h,
        tokenData.price
      )}   24H: ${this.raisePercentage(tokenData.price_24h, tokenData.price)}`
    );
  
    arr.push(
      `⌚️查询时间: ${dayjs().tz("Asia/Shanghai").format("YY-MM-DD HH:mm:ss")}`
    );
  
    return arr.join("\n").replace(/\n\n/g, "\n");
  };

  handleSolanaMessage = async (msg: string) => {
    console.log("获取gmgn数据", msg);
    if (this.isValidSolanaAddress(msg)) {
      // let data = await fetchDataByPuppeteer(msg);
      let [data1, data2, data3, data4] = await Promise.all([
        SolClient.getTokenInfoByPage(msg),
        ThirdClient.fetchHotList(msg),
        SolClient.getTokenHolderStatus(msg),
        SolClient.getTokenLauchpadInfo(msg),
      ]);
  
      let tokenInfo: any = data1;
      if (tokenInfo && tokenInfo.symbol) {
        if (data2 && data2.data && data2.data.length) {
          let hot = data2.data[0];
          tokenInfo.groupCount = hot["群数"] + 1;
          tokenInfo.queryCount = hot["次数"] + 1;
        }
  
        if (data3 && data3.data && data3.data.insider_percentage) {
          tokenInfo.insider_percentage = data3.data.insider_percentage;
        }
  
        if (data4 && data4.data && data4.data.launchpad_progress) {
          tokenInfo.launchpad_progress = data4.data.launchpad_progress;
        }
  
        let str = this.getTokenTemplate(tokenInfo);
        console.log("===========");
        console.log(str);
        return str;
      }
    }
    return null;
  };

}
export default new SolMessage();
