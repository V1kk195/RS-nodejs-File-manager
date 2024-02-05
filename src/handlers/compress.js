import {showError, toAbsolutePath} from "../helpers.js";
import {createReadStream, createWriteStream} from "node:fs";
import {pipeline} from "node:stream/promises";
import {createBrotliCompress} from "node:zlib"

export const compress = async (currentLocation, name, targetName) => {
    const filename = toAbsolutePath(currentLocation, name);
    const readable = createReadStream(filename, {encoding: "utf-8"});

    const targetFilename = toAbsolutePath(currentLocation, targetName);
    const writable = createWriteStream(targetFilename, {encoding: "utf-8"});

    const brotli = createBrotliCompress();

    try {
        await pipeline(
            readable,
            brotli,
            writable
        );
    } catch (e) {
        showError();
    }
}
