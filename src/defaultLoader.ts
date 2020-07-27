import * as fs from "fs";
import { Loader } from "./types";
const newLineRegex = /(\r\n|\r|\n)/;

interface DefaultLoaderOptions {
    wordsFilePath: string
    sentencesFilePath: string
};

interface DefaultContentLoader {
    options: DefaultLoaderOptions
};

class DefaultContentLoader implements Loader {
    constructor(options: DefaultLoaderOptions) {
        this.options = options;
    };
    key = "default";
    loadWords(): Promise<string[]> {
        let collectedWords = "";
        return new Promise((resolve, reject) => {
            const wordsStream = fs.createReadStream(this.options.wordsFilePath);
            wordsStream.on("data", (chunk: string) => {
                collectedWords += chunk;
            });
            wordsStream.on("end", () => {
                wordsStream.close();
                resolve(collectedWords.split(newLineRegex));
            });
        });
    };
    loadSentences(): Promise<string[]> {
        return new Promise((resolve, reject) => {
            resolve(["bruh"]);
        });
    };
};

export default DefaultContentLoader;
