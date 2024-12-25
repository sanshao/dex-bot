// __tests__/example.test.ts

import BotStorage from "../src/dex/db/BotStorage";

const sum = (a: number, b: number): number => a + b;

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

const tokenInfo = {
  "link": {
    
  },
  "pool_info": {
    
  },
  "chain": "sol",
  "address": "8FxTe4Q9kmz5iVm3f4dSdYLK5dSobzu9f9hF7DLmpump",
  "symbol": "RONS",
  "name": "Rons Basement",
  "decimals": 6,
  "logo": "https://dd.dexscreener.com/ds-data/tokens/solana/8FxTe4Q9kmz5iVm3f4dSdYLK5dSobzu9f9hF7DLmpump.png?size=lg&key=88e8e4",
  "biggest_pool_address": "BgWVX92oQyDpUHgCEoNXeanTxf9j4fPwK2jUnxxCzo4R",
  "open_timestamp": 1735109397,
  "holder_count": 202,
  "circulating_supply": "999993691",
  "total_supply": "999993691",
  "max_supply": "999993691",
  "liquidity": "9614.22356968872",
  "creation_timestamp": 1735108833,
  "price": "0.0000064900027",
  "price_1m": "0.0000064789994",
  "buys_1m": 2,
  "sells_1m": 1,
  "swaps_1m": 3,
  "buy_volume_1m": "7.14923685",
  "sell_volume_1m": "0.35755596",
  "volume_1m": "7.50679282",
  "price_5m": "0.0000062443108",
  "buys_5m": 10,
  "sells_5m": 17,
  "swaps_5m": 27,
  "buy_volume_5m": "202.31458271",
  "sell_volume_5m": "113.56388062",
  "volume_5m": "315.87846333",
  "price_1h": "0.000005755657",
  "buys_1h": 3536,
  "sells_1h": 2982,
  "swaps_1h": 6518,
  "buy_volume_1h": "367274.045230608",
  "sell_volume_1h": "363769.29877656",
  "volume_1h": "731043.34400717",
  "price_6h": "0.000005755657",
  "buys_6h": 3536,
  "sells_6h": 2982,
  "swaps_6h": 6518,
  "buy_volume_6h": "367274.045230609",
  "sell_volume_6h": "363769.29877656",
  "volume_6h": "731043.34400717",
  "price_24h": "0.000005755657",
  "buys_24h": 3536,
  "sells_24h": 2982,
  "swaps_24h": 6518,
  "buy_volume_24h": "367274.045230609",
  "sell_volume_24h": "363769.29877656",
  "volume_24h": "731043.34400717",
  "hot_level": 3,
  "creator_address": "FUqwwaBZWwEcVJxddB6vnVZxAVyqRjijkfLxTtpdFV1h",
  "creator_token_balance": "0",
  "creator_token_status": "creator_close",
  "twitter_name_change_history": [
    
  ],
  "top_10_holder_rate": "0.183279",
  "dexscr_ad": 0,
  "dexscr_update_link": 1,
  "cto_flag": 1,
  "pair_address": "BgWVX92oQyDpUHgCEoNXeanTxf9j4fPwK2jUnxxCzo4R",
  "net_in_volume_1m": 6.79168089,
  "net_in_volume_5m": 88.75070208999999,
  "net_in_volume_1h": 3504.7464540480287,
  "net_in_volume_6h": 3504.746454049018,
  "net_in_volume_24h": 3504.746454049018,
  "market_cap": "6489.9617545729657",
  "circulating_market_cap": "6489.9617545729657",
  "fdv": "6489.9617545729657"
}

describe('db add record', () => {
  it('should add record', async () => {
    BotStorage.addRecord({
      ...tokenInfo,
      queryUser: "test test4",
      // roomName: "test room3",
      // queryCount: 1,
      // roomCount: 1
    })
  })
})