import * as fs from "fs";
import { Loader } from "./types";
import { resolve } from "path";
const newLineRegex = /(\r\n|\r|\n)/;

interface DefaultLoaderOptions {
    wordsFilePath: string
    sentencesFilePath: string
};

interface DefaultContentLoader {
    options: DefaultLoaderOptions
    wordsStream: fs.WriteStream
    sentencesStream: fs.WriteStream
};

class DefaultContentLoader implements Loader {
    constructor(options: DefaultLoaderOptions) {
        this.options = options;
        this.wordsStream = fs.createWriteStream(this.options.wordsFilePath, { flags: "a" });
        this.sentencesStream = fs.createWriteStream(this.options.sentencesFilePath, { flags: "a" });
    };
    key = "default";

    private loadContent(path: string): Promise<string[]> {
        return new Promise((resolve, reject) => {
            let collected = "";
            const stream = fs.createReadStream(path);
            stream.on("data", (chunk) => {
                collected += chunk;
            });
            stream.on("end", () => {
                stream.close();
                resolve(collected.split(newLineRegex));
            });
        });
    };

    loadWords(): Promise<string[]> {
        return this.loadContent(this.options.wordsFilePath);
    };

    loadSentences(): Promise<string[]> {
        return this.loadContent(this.options.sentencesFilePath);
    };

    async saveSentence(sentence: string) {
        this.sentencesStream.write(`${sentence}\n`);
    };

    async saveWord(word: string) {
        this.wordsStream.write(`${word}\n`);
    };
};

export default DefaultContentLoader;
