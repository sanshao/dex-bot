import { Record, Token } from "@prisma/client";
import { prisma } from "./db";
import { TokenFullInfoModel } from "../gmgn/sol/SolMessage";

export type TokenInfoStorageModel = TokenFullInfoModel & {
  queryUser: string;
  roomName?: string;
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
        let roomCount = 0;
        if (roomName) {
          let distinctRoomNames = await prisma.record.findMany({
            where: {
              ca: address,
              roomName: {
                not: "", // 排除空字符串
              },
            },
            select: {
              roomName: true,
            },
            distinct: ["roomName"],
          });
          roomCount = distinctRoomNames.length;
        }

        await prisma.token.update({
          where: {
            ca: address,
          },
          data: {
            queryCount: token.queryCount + 1,
            ...(roomCount > 0 ? { roomCount: roomCount } : {}),
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

  getTokenAnlysis(ca: string) {
    return prisma.token.findUnique({
      where: {
        ca,
      },
      select: {
        ca: true,
        queryCount: true,
        roomCount: true,
        firstCaller: true,
        firstPrice: true,
        firstFdv: true,
      },
    });
  }
}

export default new BotStorage();
