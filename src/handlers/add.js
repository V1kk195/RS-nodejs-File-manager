import {writeFile} from "node:fs/promises";
import {showError, toAbsolutePath} from "../helpers.js";

export const add = async (currentLocation, name) => {
    const filename = toAbsolutePath(currentLocation, name);

    try {
        await writeFile(filename, "", {flag: "wx"});
    } catch (e) {
        showError();
    }
}
