import {showError, toAbsolutePath} from "../helpers.js";
import {createReadStream, createWriteStream} from "node:fs";
import {pipeline} from "node:stream/promises";
import {createBrotliDecompress} from "node:zlib"

export const decompress = async (currentLocation, name, targetName) => {
    const filename = toAbsolutePath(currentLocation, name);
    const readable = createReadStream(filename);

    const targetFilename = toAbsolutePath(currentLocation, targetName);
    const writable = createWriteStream(targetFilename, {encoding: "utf-8"});

    const brotli = createBrotliDecompress();

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
