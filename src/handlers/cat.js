import {createReadStream} from "node:fs";
import {stdout} from "node:process";
import {checkIsFile, showError, toAbsolutePath} from "../helpers.js";

export const cat = async (currentLocation, path) => {
    const filename = toAbsolutePath(currentLocation, path);
    const isFile = await checkIsFile(filename);

    if (isFile) {
        const stream = createReadStream(filename, {encoding: "utf-8"});

        stream.on("data", (chunk) => {
            stdout.write(chunk);
        });
    } else {
        showError();
    }
}
