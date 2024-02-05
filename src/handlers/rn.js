import { rename } from "node:fs/promises";
import {showError, toAbsolutePath} from "../helpers.js";

export const rn = async (currentLocation, name, newName) => {
    const filename = toAbsolutePath(currentLocation, name);
    const targetFilename = toAbsolutePath(currentLocation, newName);

    try {
        await rename(filename, targetFilename);
    } catch (e) {
        showError();
    }
}
