import * as zlib from "zlib";

function learnSentence(sentence: string, contexts: number) {
    let bodyWords = sentence.split(/ +/);
    if (!bodyWords.length) return;
    const encoded = zlib.brotliCompressSync(sentence);
};

export default learnSentence;
