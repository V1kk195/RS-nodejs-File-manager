import process, { argv, stdin, stdout } from "node:process";
import { homedir } from "node:os";
import { dirname, parse } from "node:path";
import { fileURLToPath } from "url";
import { printCurrentLocation } from "./helpers.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const username =  argv[2].split("=")[1];
const userHomeDir = homedir();
const rootDir = parse(process.cwd()).root;

console.log(`Welcome to the File Manager, ${username}!`);
printCurrentLocation();

stdin.on("data", (data) => {

});

process.on('SIGINT', (code) => {
    console.log(`\nThank you for using File Manager, ${username}, goodbye!\n`);
    process.exit();
});
