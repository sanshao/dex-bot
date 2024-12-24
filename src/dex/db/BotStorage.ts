import { Record, Token } from "@prisma/client";
import { prisma } from "./db";
import { TokenFullInfoModel } from "../gmgn/sol/SolMessage";

export type TokenInfoStorageModel = TokenFullInfoModel & {
  queryUser: string;
  groupName: string;
};

class BotStorage {
  async addRecord(info: TokenInfoStorageModel) {
    try {
      let { address, price, fdv, groupName = "", queryUser = "" } = info;

      let record = await prisma.record.create({
        data: {
          ca: address,
          price,
          fdv,
          groupName,
          queryUser,
        },
      });
      let token = await prisma.token.findUnique({
        where: {
          ca: address,
        },
        select: {
          queryNum: true,
          groupNum: true,
          firstCaller: true,
          firstPrice: true,
          firstFdv: true,
        },
      });
      if (token) {
        await prisma.token.update({
          where: {
            ca: address,
          },
          data: {
            queryNum: token.queryNum + 1,
            groupNum: token.groupNum,
          },
        });
      } else {
        await prisma.token.create({
          data: {
            ca: address,
            queryNum: 1,
            groupNum: 1,
            firstCaller: queryUser,
            firstPrice: price,
            firstFdv: fdv,
          },
        });
      }
    } catch (error) {}
  }
}

export default new BotStorage();
