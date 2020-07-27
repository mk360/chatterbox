export interface Loader {
    key: string
    loadSentences: () => Promise<string[]>
    loadWords: () => Promise<string[]>
};
