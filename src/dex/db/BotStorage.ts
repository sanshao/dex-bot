import { Record, Token } from "@prisma/client";
import { prisma } from "./db";
import { TokenFullInfoModel } from "../gmgn/sol/SolMessage";

export type TokenInfoStorageModel = TokenFullInfoModel & {
  queryUser: string;
  roomName: string;
};

class BotStorage {
  async addRecord(info: TokenInfoStorageModel) {
    try {
      let { address, price, fdv, roomName = "", queryUser = "" } = info;

      let record = await prisma.record.create({
        data: {
          ca: address,
          price,
          fdv,
          roomName,
          queryUser,
        },
      });
      let token = await prisma.token.findUnique({
        where: {
          ca: address,
        },
        select: {
          queryCount: true,
          roomCount: true,
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
            queryCount: token.queryCount + 1,
            roomCount: token.roomCount,
          },
        });
      } else {
        await prisma.token.create({
          data: {
            ca: address,
            queryCount: 1,
            roomCount: 1,
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
