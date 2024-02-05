import {showError, toAbsolutePath} from "../helpers.js";
import {createReadStream, createWriteStream} from "node:fs";
import {pipeline} from "node:stream/promises";
// import {rm} from "node:fs/promises";
import {cp} from "./cp.js";
import {rm} from "./rm.js";
import path from "node:path";

export const mv = async (currentLocation, name, targetDir) => {
    try {
        await cp(currentLocation, name, `${targetDir}/${path.parse(name).base}`);
        await rm(currentLocation, name);
    } catch (e) {
        showError();
    }
}
