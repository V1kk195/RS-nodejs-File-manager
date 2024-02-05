import {createReadStream, createWriteStream} from "node:fs";
import {showError, toAbsolutePath} from "../helpers.js";
import {pipeline} from "node:stream/promises";

export const cp = async (currentLocation, name, targetName) => {
    const filename = toAbsolutePath(currentLocation, name);
    const readable = createReadStream(filename, {encoding: "utf-8"});

    const targetFilename = toAbsolutePath(currentLocation, targetName);
    const writable = createWriteStream(targetFilename, {encoding: "utf-8"});

    try {
        await pipeline(
            readable,
            writable
        );
    } catch (e) {
        showError();
    }
}
