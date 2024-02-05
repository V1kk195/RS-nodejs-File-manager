import {showError, toAbsolutePath} from "../helpers.js";
import {rm as fsRm} from "node:fs/promises";

export const rm = async (currentLocation, name) => {
    const filename = toAbsolutePath(currentLocation, name);

    try {
        await fsRm(filename);
    } catch (e) {
        showError();
    }
}
