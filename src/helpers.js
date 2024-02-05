import { stat } from "node:fs/promises";
import { isAbsolute, join } from "node:path";

export const showError = () => {
    console.log("Operation failed");
}

export const getCommandFromMessage = (message) => {
    return message.split(/\s+/g)[0];
}

export const getSecondArgFromMessage = (message) => {
    return message.split(/\s+/g)[1];
}

export const getThirdArgFromMessage = (message) => {
    return message.split(/\s+/g)[2];
}

export const checkIsDir = async (path) => {
    try {
        const res = await stat(path);
        return res.isDirectory();
    } catch (e) {
        return false;
    }
}

export const checkIsFile = async (path) => {
    try {
        const res = await stat(path);
        return res.isFile();
    } catch (e) {
        return false;
    }
}

export const toAbsolutePath = (currentLocation, path) => {
    if (isAbsolute(path)) {
        return path;
    }

    return join(currentLocation, path);
}
