#!/usr/bin/env -S node --no-warnings --loader ts-node/esm

import { WechatyBuilder, ScanStatus, Message, Contact } from "wechaty";
import qrcodeTerminal from "qrcode-terminal";
import SolMessage from "../gmgn/sol/SolMessage";
import { args } from "../../args";
import BotStorage from "../db/BotStorage";

function onScan(qrcode: string, status: number) {
  if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
    const qrcodeImageUrl = [
      "https://wechaty.js.org/qrcode/",
      encodeURIComponent(qrcode),
    ].join("");
    console.info(
      "StarterBot",
      "onScan:",
      ScanStatus[status],
      status,
      qrcodeImageUrl
    );

    qrcodeTerminal.generate(qrcode, { small: true }); // show qrcode on console
  } else {
    console.info("StarterBot", "onScan:", ScanStatus[status], status);
  }
}

function onLogin(user: Contact) {
  console.info("StarterBot", "login", user);
}

function onLogout(user: Contact) {
  console.info("StarterBot", "logout", user);
}

async function onMessage(msg: Message) {
  console.info("StarterBot", msg.toString());

  if (msg.text() === "ding") {
    await msg.say("dong");
  }
  let text = msg.text();
  try {
    let tokenInfo = await SolMessage.handleSolanaMessage(text);
    if (tokenInfo) {
      let replyText = SolMessage.getTokenTemplate(tokenInfo);
      if (replyText) {
        msg.say(replyText);
      }
      let roomName = await msg.room()?.topic();
      BotStorage.addRecord({
        ...tokenInfo,
        queryUser: msg.talker()?.name(),
        roomName: roomName || "",
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function startWechatBot(param = {} as any) {
  const wechaty = WechatyBuilder.build({
    name: "wechat-dex-bot",
  }); // get a Wechaty instance
  wechaty.on("scan", onScan).on("login", onLogin).on("message", onMessage);

  wechaty
    .start()
    .then(() => console.info("StarterBot", "Starter Bot Started."))
    .catch((e) => console.error("StarterBot", e));
}

export { startWechatBot };