import bs58 from "bs58";
import {
  Connection,
  Keypair,
  Transaction,
  VersionedTransaction,
} from "@solana/web3.js";
import { OkxClient } from "./OkxClient";
import {
  APIConfig,
  QUOTE_TOKEN_ADDRESS,
  SOL_RPC_URL,
  SPL_TOKEN_ADDRESS,
  WALLET_PRIVATE_KEY,
  WALLET_SOL_ADDRESS,
} from "./config";

const privateKey = WALLET_PRIVATE_KEY; // 私钥
const userWalletAddress = WALLET_SOL_ADDRESS; // 用户钱包地址
const okxClient = new OkxClient({ ...APIConfig });

const connection = new Connection(
  SOL_RPC_URL || "https://api.mainnet-beta.solana.com",
  "confirmed"
); // 连接到 Solana 主网

async function signTransaction(
  callData: string,
  privateKey: string
): Promise<Transaction | VersionedTransaction> {
  const transaction = bs58.decode(callData);
  let tx: Transaction | VersionedTransaction;

  try {
    tx = Transaction.from(transaction);
  } catch (error) {
    tx = VersionedTransaction.deserialize(transaction);
  }

  const recentBlockHash = await connection.getLatestBlockhash();
  if (tx instanceof VersionedTransaction) {
    tx.message.recentBlockhash = recentBlockHash.blockhash;
  } else {
    tx.recentBlockhash = recentBlockHash.blockhash;
  }

  const feePayer = Keypair.fromSecretKey(bs58.decode(privateKey));

  if (tx instanceof VersionedTransaction) {
    tx.sign([feePayer]);
  } else {
    tx.partialSign(feePayer);
  }

  return tx;
}

async function executeTransaction(
  tx: Transaction | VersionedTransaction
): Promise<string> {
  const txId = await connection.sendRawTransaction(tx.serialize());
  const latestBlockHash = await connection.getLatestBlockhash();

  // await connection.confirmTransaction(txId);
  await connection.confirmTransaction(
    {
      signature: txId,
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
    },
    "confirmed"
  );
  console.log(`Transaction ID: ${txId}`);
  return txId;
}

const swap = async (param: {
  fromAddress: string;
  toAddress: string;
  amount: number;
}) => {
  const slippage = 0.05; // 5% slippage

  let { fromAddress, toAddress, amount } = param;
  let fromTokenAddress = fromAddress;
  let toTokenAddress = toAddress;

  let { data } = await okxClient.get("/api/v5/dex/aggregator/swap", {
    amount: amount * 10 ** 6,
    chainId: 501,
    fromTokenAddress,
    toTokenAddress,
    userWalletAddress,
    slippage,
    gasLevel: "slow",
  });
  console.log("res.data", data);

  if (data && data.length) {
    let { tx } = data[0];
    if (tx.data && privateKey) {
      let signedTransaction = await signTransaction(tx.data, privateKey);
      let txId = await executeTransaction(signedTransaction);
      console.log(`Transaction confirmed: https://solscan.io/tx/${txId}`);
      return txId;
    }
  }
  return null;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function getRandomNumber(min: number, max: number, decimals: number): number {
  const random = Math.random() * (max - min) + min;
  return parseFloat(random.toFixed(decimals));
}

export const buySpl = async () => {
  const fromAddress = QUOTE_TOKEN_ADDRESS; // USDT 地址
  const toAddress = SPL_TOKEN_ADDRESS; // SPL 地址
  const amount = 0.1; // USDT的数量
  // @ts-ignore
  return await swap({ fromAddress, toAddress, amount });
};

export const sellSpl = async () => {
  const fromAddress = SPL_TOKEN_ADDRESS; // SPL 地址
  const toAddress = QUOTE_TOKEN_ADDRESS; // USDT 地址
  const amount = 0.735; // SPL的数量
  // @ts-ignore
  return await swap({ fromAddress, toAddress, amount });
};

export const sellAfterBuy = async () => {
  await buySpl();
  await sellSpl();
};

export async function startTrade() {
  try {
    await sellAfterBuy();
    const timeRandom = getRandomNumber(60, 80, 0);
    // console.log('sleep', timeRandom / 60, 'min')
    await sleep(10 ** 3 * timeRandom);
    startTrade();
    // setInterval(() => {
    //   buyAfterSell();
    // }, 3 * 60 * 1000);
  } catch (error) {
    console.log("startTrade===>", error);
  }
}

// startTrade()
