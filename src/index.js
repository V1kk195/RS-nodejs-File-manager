import process, { argv, stdin } from "node:process";
import { homedir } from "node:os";
import { dirname, parse, isAbsolute, join } from "node:path";
import { fileURLToPath} from "url";
import { checkIsDir, showError } from "./helpers.js";
import { ls } from "./handlers/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const username =  argv[2]?.split("=")[1] || "noname";
const userHomeDir = homedir();
const rootDir = parse(process.cwd()).root;
let currentLocation = userHomeDir;

const printCurrentLocation = () => {
    console.log(`You are currently in ${currentLocation}`);
}

console.log(`Welcome to the File Manager, ${username}!`);
printCurrentLocation();

const up = () => {
    if (currentLocation === rootDir) return;

    currentLocation = join(currentLocation, "..");
}

const cd = async (newPath) => {
    const res = await checkIsDir(newPath)
    if (!res) {
        showError();
        return;
    }

    if (isAbsolute(newPath)) {
        currentLocation = newPath;
    } else {
        currentLocation = join(currentLocation, newPath);
    }
}

stdin.on("data", async (data) => {
    const message = data.toString().trim();

    if (message === "up") {
        up();
        printCurrentLocation();
        return;
    }

    if (message.split(" ")[0] === "cd") {
        const path = message.split(/\s+/g)[1];
        await cd(path);
        printCurrentLocation();
        return;
    }

    if (message === "ls") {
        await ls(currentLocation);
        printCurrentLocation();
        return;
    }
});

process.on('SIGINT', (code) => {
    console.log(`\nThank you for using File Manager, ${username}, goodbye!\n`);
    process.exit();
});
