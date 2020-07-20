import * as fs from "fs";
import { Db } from "mongodb";

type ContentSource = /*"mongodb" | */"text-files";

interface LoaderOptions {
    contentSource: ContentSource
    mongodbOptions?: {
        connectionURIString: string
        wordsCollectionName: string
        sentencesCollectionName: string
    }
    textFileOptions?: {
        wordsFilePath: string
        sentencesFilePath: string
    }
};

interface ContentLoader {
    options: LoaderOptions
};

class ContentLoader {
    constructor(loaderOptions: LoaderOptions) {
        this.options = loaderOptions;
        if (this.options.contentSource === "text-files") {
            switch (false) { // JS HACKS
                case Boolean(this.options.textFileOptions):
                    throw new Error("With text files being your dictionary source, you should specify both words' and sentences file paths. None are currently specified.");
                case Boolean(this.options.textFileOptions.sentencesFilePath):
                case this.options.textFileOptions.sentencesFilePath.endsWith(".txt"):
                    throw new Error("The file supposedly containing sentences is either missing or isn't a .txt file.");
                case Boolean(this.options.textFileOptions.wordsFilePath):
                case this.options.textFileOptions.wordsFilePath.endsWith("txt"):
                    throw new Error("The file supposedly containing words is either missing or isn't a .txt file.");
            };
            this.loadFromTextFiles();
        }
    };

    private loadFromTextFiles(): Promise<{
        words: string[],
        sentences: string[]
    }> {
        let collectedWords = "";
        let collectedSentences = "";
        let finishedCollectingWords = false;
        let finishedCollectingSentences = false; // could be much better, but hey, it works
        return new Promise((resolve, reject) => {
            const wordSplitRegex = /(\r\n|\r|\n)/;
            const wordsStream = fs.createReadStream(this.options.textFileOptions.wordsFilePath);
            const sentencesStream = fs.createReadStream(this.options.textFileOptions.sentencesFilePath);
            wordsStream.on("data", (chunk: string) => {
                collectedWords += chunk;
            });
            wordsStream.on("end", () => {
                wordsStream.close();
                finishedCollectingWords = true;
                if (finishedCollectingSentences) {
                    resolve({
                        words: collectedWords.split(wordSplitRegex),
                        sentences: collectedSentences.split(wordSplitRegex)
                    });
                }
            });
            sentencesStream.on("data", (ch) => {
                collectedSentences += ch;
            });
            sentencesStream.on("end", () => {
                sentencesStream.close();
                finishedCollectingWords = true;
                if (finishedCollectingWords) {
                    resolve({
                        words: collectedWords.split(wordSplitRegex),
                        sentences: collectedSentences.split(wordSplitRegex)
                    });
                }
            });
        });
    };
};

export default ContentLoader;
