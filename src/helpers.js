import {dirname} from "node:path";
import {fileURLToPath} from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const printCurrentLocation = () => {
    console.log(`You are currently in ${__dirname}`);
}
