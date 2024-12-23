#!/usr/bin/env -S node --no-warnings --loader ts-node/esm

import { WechatyBuilder, ScanStatus, Message, Contact } from "wechaty";
import qrcodeTerminal from "qrcode-terminal";
import SolMessage from "../gmgn/sol/SolMessage";


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
  // let text = msg.text();
  // try {
  //   let replyText = await handleSolanaMessage(text);
  //   if (replyText) {
  //     await msg.say(replyText);
  //     // db.addQueryCount(text);
  //   }
  // } catch (error) {
  //   console.log(error);
  // }
}

function main() {
  const wechaty = WechatyBuilder.build({
    name: "wechat-dex-bot",
  }); // get a Wechaty instance
  wechaty.on("scan", onScan).on("login", onLogin).on("message", onMessage);

  wechaty
    .start()
    .then(() => console.info("StarterBot", "Starter Bot Started."))
    .catch((e) => console.error("StarterBot", e));
}

// main();

SolMessage.handleSolanaMessage("5DQSDg6SGkbsbykq4mQstpcL4d5raEHc6rY7LgBwpump");
