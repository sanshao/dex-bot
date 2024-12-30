import 'dotenv/config';
import { ApiConfigModel } from './OkxModel';

export const {
  OKX_API_KEY,
  OKX_API_SERET_KEY,
  OKX_API_PASSPHRASE,
  
  WALLET_PRIVATE_KEY,
  WALLET_SOL_ADDRESS,
  SOL_RPC_URL,

  SPL_TOKEN_ADDRESS,
  QUOTE_TOKEN_ADDRESS,
} = process.env;

export const APIConfig = {
  apiKey: OKX_API_KEY,
  secretKey: OKX_API_SERET_KEY,
  passphrase: OKX_API_PASSPHRASE,
} as ApiConfigModel

