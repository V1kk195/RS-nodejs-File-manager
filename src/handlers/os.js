import {getSecondArgFromMessage, showError} from "../helpers.js";
import {cpus, EOL, homedir, userInfo, arch} from "node:os";

const methods = {
    eol: () => console.log(EOL),
    cpus: () => console.log(cpus()),
    homedir: () => console.log(homedir()),
    username: () => console.log(userInfo().username),
    architecture: () => console.log(arch()),
}

export const os = (message) => {
    try {
        const key = getSecondArgFromMessage(message).slice(2);

        return methods[key]();
    } catch (e) {
        showError();
    }
}
