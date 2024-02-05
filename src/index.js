import process, { argv, stdin } from "node:process";
import { homedir } from "node:os";
import { dirname, parse, isAbsolute, join } from "node:path";
import { fileURLToPath} from "url";
import {checkIsDir, getCommandFromMessage, getPathFromMessage, getThirdArgFromMessage, showError} from "./helpers.js";
import {ls, cat, add, rn, cp, rm, mv} from "./handlers/index.js";

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
    const checkPathExists = async (path) => {
        const res = await checkIsDir(path)
        if (!res) {
            showError();
        }

        return res;
    }

    if (isAbsolute(newPath)) {
        const exists = await checkPathExists(newPath);
        exists && (currentLocation = newPath);
    } else {
        const path = join(currentLocation, newPath);
        const exists = await checkPathExists(path);
        exists && (currentLocation = path);
    }
}

stdin.on("data", async (data) => {
    const message = data.toString().trim();

    if (message === "up") {
        up();
        printCurrentLocation();
        return;
    }

    if (getCommandFromMessage(message) === "cd") {
        const path = getPathFromMessage(message);
        await cd(path);
        printCurrentLocation();
        return;
    }

    if (message === "ls") {
        await ls(currentLocation);
        printCurrentLocation();
        return;
    }

    if (getCommandFromMessage(message) === "cat") {
        const path = getPathFromMessage(message);
        await cat(currentLocation, path);
        printCurrentLocation();
        return;
    }

    if (getCommandFromMessage(message) === "add") {
        const name = getPathFromMessage(message);
        await add(currentLocation, name);
        printCurrentLocation();
        return;
    }

    if (getCommandFromMessage(message) === "rn") {
        const name = getPathFromMessage(message);
        await rn(currentLocation, name, getThirdArgFromMessage(message));
        printCurrentLocation();
        return;
    }

    if (getCommandFromMessage(message) === "cp") {
        const name = getPathFromMessage(message);
        await cp(currentLocation, name, getThirdArgFromMessage(message));
        printCurrentLocation();
        return;
    }

    if (getCommandFromMessage(message) === "rm") {
        const name = getPathFromMessage(message);
        await rm(currentLocation, name);
        printCurrentLocation();
        return;
    }

    if (getCommandFromMessage(message) === "mv") {
        const name = getPathFromMessage(message);
        await mv(currentLocation, name, getThirdArgFromMessage(message));
        printCurrentLocation();
        return;
    }
});

process.on('SIGINT', (code) => {
    console.log(`\nThank you for using File Manager, ${username}, goodbye!\n`);
    process.exit();
});
