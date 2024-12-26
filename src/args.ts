import { Command } from "commander";

const program = new Command();

program
  .option("-m, --mode <string>", "normol/simple")
  .option("-wx, --weixin <string>", "");

program.parse(process.argv);

const args = program.opts();

console.log("args:", args);
if (!args.mode) {
  args.mode = "normol";
}

export { args };
