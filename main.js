const fs = require("fs");
const prompt = require("prompt-sync")();

console.log("===========================");
console.log("1. Get Item");
console.log("2. get only id");
console.log("===========================");
const options = prompt("Select options: ");

const getItem = () => {
  try {
    const itemData = fs.readFileSync("CoreData.txt", "utf-8");
    let done = false;

    while (!done) {
      const searchText = prompt("Name Item (-1 if your done): ");

      if (searchText == -1) {
        done = true;
        return;
      }

      let regex = new RegExp(`(.*)\\|${searchText}(.*?)\\|`, "gm");

      const output = (itemData.match(regex) || [])
        .join("\n")
        .replaceAll(/\|$/gm, "");

      if (fs.existsSync("output.txt")) {
        fs.appendFileSync("output.txt", "\n" + output, "utf8");
      } else {
        fs.writeFileSync("output.txt", output, "utf8");
      }

      console.log("[+] Successfully generated or created output.txt");
    }
  } catch (error) {
    console.error(`[-] 'CoreData.txt' not found.`);
    console.error(`[!] Your must get CoreData.txt and move this directory.`);
  }
};

const getId = () => {
  try {
    const itemIdData = fs.readFileSync("output.txt", "utf-8");

    const output = itemIdData
      .replaceAll(/\|(.*)$/gm, ",")
      .replaceAll(/\n/gm, "");

    if (fs.existsSync("id.txt")) {
      fs.appendFileSync("id.txt", output.replace(/\,$/gi, ""), "utf8");
    } else {
      fs.writeFileSync("id.txt", output, "utf8");
    }
    console.log("[+] Successfully generated or created id.txt");
  } catch (error) {
    console.error(`[-] 'output.txt' not found.`);
    console.error("[!] Yout must search item first");
  }
};

switch (options) {
  case "1":
    getItem();
    break;
  case "2":
    getId();
    break;
  default:
    console.error("[-] Error: Unknown option");
    break;
}
