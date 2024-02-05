import {readdir} from "node:fs/promises";
import {showError} from "../helpers.js";

export const ls = async (currentLocation) => {
    let sourceFiles;
    try {
        sourceFiles = await readdir(currentLocation, { withFileTypes: true });
        const dirContentMapped = sourceFiles.map(item => ({name: item.name, type: item.isDirectory() ? "directory" : "file"}));
        const dirContentSorted = dirContentMapped.sort((a, b) => {
            if (a.type === b.type) {
                return a.name.localeCompare(b.name);
            }

            return a.type === "directory" ? -1 : 1;
        })
        console.table(dirContentSorted);
    } catch (e) {
        showError();
    }
}
