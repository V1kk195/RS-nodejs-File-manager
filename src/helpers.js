import { stat } from "node:fs/promises";

export const showError = () => {
    console.log("Operation failed");
}

export const checkIsDir = async (path) => {
    try {
        const res = await stat(path);
        return res.isDirectory();
    } catch (e) {
        return false;
    }
}
