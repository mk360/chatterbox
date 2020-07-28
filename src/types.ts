export interface Loader {
    key: string
    loadSentences: () => Promise<string[]>
    loadWords: () => Promise<string[]>
    saveSentence: (sentence: string) => Promise<any>
    saveWord: (word: string) => Promise<any>
};
