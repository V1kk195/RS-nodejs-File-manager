import {showError, toAbsolutePath} from "../helpers.js";
import {readFile} from "node:fs/promises";
import {createHash} from "node:crypto";

export const hash = async (currentLocation, name) => {
    const filename = toAbsolutePath(currentLocation, name);

    try {
        const fileContent = await readFile(filename, {encoding: 'utf-8'});
        const hash = createHash("sha256").update(fileContent).digest("hex");
        console.log(hash);
    } catch (e) {
        showError();
    }
}
