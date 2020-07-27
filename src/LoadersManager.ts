import levenshteinDistance from "./LevenshteinDistance";
import { Loader } from "./types";
import DefaultLoader from "./defaultLoader";

interface LoadersManager {
    loaders: Loader[]
};

class LoadersManager {
    constructor() {
        this.loaders = [];
    };

    addLoader(loader: Loader) {
        let foundLoaders = this.getMatchingLoaders(loader.key);
        if (foundLoaders.length) throw new Error(`Content loader with key ${loader.key} already exists.`);
        else this.loaders.push(loader);
    };

    private getLoader(key: string) {
        let matchingLoaders = this.getMatchingLoaders(key);
        if (matchingLoaders.length) return matchingLoaders[0];
        else {
            let nearestKey = this.getNearestKey(key);
            throw new Error(`Loader with key ${key} not found. Did you mean to get the loader under key "${nearestKey}"?`);
        }
    };

    private getNearestKey(string: string) {
        let keys = this.loaders.map(l => l.key);
        return keys.map(key => ({
            key,
            distance: levenshteinDistance(key, string)
        })).sort((a, b) => a.distance - b.distance)[0].key;
    };

    removeLoader(loader: Loader) {
        this.loaders = this.loaders.filter(existingLoader => existingLoader.key !== loader.key);
    };

    private getMatchingLoaders(key: string) {
        let matchingLoaders = this.loaders.filter(loader => loader.key === key);
        return matchingLoaders;
    };
};

export default LoadersManager;
