interface MongoDBOptions {
    uriConnectionString: string
    wordsCollection: string
    sentencesCollection: string
}

type WordsSource = "local-files" | "mongodb"

declare namespace Chatterbox {
    export interface ChatterboxOptions {
        wordsSource: WordsSource
        mongoDBOptions?: {

        }
    }
}
