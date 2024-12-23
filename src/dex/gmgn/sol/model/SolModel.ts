
export interface TokenInfoModel {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  logo: string;
  biggest_pool_address: string;
  open_timestamp: number;
  holder_count: number;
  circulating_supply: string;
  total_supply: string;
  max_supply: string;
  liquidity: string;
  creation_timestamp: number;
}

export interface TokenPoolInfoModel {
  address: string;
  pool_address: string;
  quote_address: string;
  quote_symbol: string;
  liquidity: string;
  base_reserve: string;
  quote_reserve: string;
  initial_liquidity: string;
  initial_base_reserve: string;
  initial_quote_reserve: string;
  creation_timestamp: number;
  base_reserve_value: string;
  quote_reserve_value: string;
  quote_vault_address: string;
  base_vault_address: string;
  creator: string;
}

export interface TokenDevInfoModel {
  address: string;
  creator_address: string;
  creator_token_balance: string;
  creator_token_status: string;
  twitter_name_change_history: object[];
  top_10_holder_rate: string;
  dexscr_ad: number;
  dexscr_update_link: number;
  cto_flag: number;
}

export interface TokenSecurityInfoModel {
  address: string;
  is_show_alert: boolean;
  top_10_holder_rate: string;
  renounced_mint: boolean;
  renounced_freeze_account: boolean;
  burn_ratio: string;
  burn_status: string;
  dev_token_burn_amount: string;
  dev_token_burn_ratio: string;
}

export interface TokenLaunchpadInfoModel {
  address: string;
  launchpad: string;
  launchpad_status: number;
  launchpad_progress: string;
  description: string;
}

export interface TokenLinkInfoModel {
  address: string;
  gmgn: string;
  geckoterminal: string;
  twitter_username: string;
  website: string;
  telegram: string;
  bitbucket: string;
  discord: string;
  description: string;
  facebook: string;
  github: string;
  instagram: string;
  linkedin: string;
  medium: string;
  reddit: string;
  tiktok: string;
  youtube: string;
  verify_status: number;
}

export interface TokenRugInfoModel {
  address: string;
  rug_ratio: string;
  holder_rugged_num: number;
  holder_token_num: number;
  rugged_tokens: null;
}

export interface TokenHolderStatModel {
  smart_degen_count: number;
  renowned_count: number;
  fresh_wallet_count: number;
  dex_bot_count: number;
  insider_count: number;
  insider_percentage: string;
  following_count: number;
}


export interface TokenInfoModelFromPageProps {
  // link: TokenLinkInfoModel;
  // pool_info: TokenPoolInfoModel;
  chain: string;
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  logo: string;
  biggest_pool_address: string;
  open_timestamp: number;
  holder_count: number;
  circulating_supply: string;
  total_supply: string;
  max_supply: string;
  liquidity: string;
  creation_timestamp: number;
  price: string;
  price_1m: string;
  buys_1m: number;
  sells_1m: number;
  swaps_1m: number;
  buy_volume_1m: string;
  sell_volume_1m: string;
  volume_1m: string;
  price_5m: string;
  buys_5m: number;
  sells_5m: number;
  swaps_5m: number;
  buy_volume_5m: string;
  sell_volume_5m: string;
  volume_5m: string;
  price_1h: string;
  buys_1h: number;
  sells_1h: number;
  swaps_1h: number;
  buy_volume_1h: string;
  sell_volume_1h: string;
  volume_1h: string;
  price_6h: string;
  buys_6h: number;
  sells_6h: number;
  swaps_6h: number;
  buy_volume_6h: string;
  sell_volume_6h: string;
  volume_6h: string;
  price_24h: string;
  buys_24h: number;
  sells_24h: number;
  swaps_24h: number;
  buy_volume_24h: string;
  sell_volume_24h: string;
  volume_24h: string;
  hot_level: number;
  creator_address: string;
  creator_token_balance: string;
  creator_token_status: string;
  twitter_name_change_history: object[];
  top_10_holder_rate: string;
  dexscr_ad: number;
  dexscr_update_link: number;
  cto_flag: number;
  pair_address: string;
  net_in_volume_1m: number;
  net_in_volume_5m: number;
  net_in_volume_1h: number;
  net_in_volume_6h: number;
  net_in_volume_24h: number;
  market_cap: string;
  circulating_market_cap: string;
  fdv: string;
}
