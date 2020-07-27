import LoadersManager from "./LoadersManager";
import { Loader } from "./types";

interface ChatterboxOptions {
    loaders?: Loader[]
    loader?: Loader
};

interface Chatterbox {
    loadersManager: LoadersManager
};

class Chatterbox {
    constructor(customLoaders?: ChatterboxOptions) {
        this.loadersManager = new LoadersManager();
        if (customLoaders?.loaders) {
            for (let loader of customLoaders.loaders) {
                this.loadersManager.addLoader(loader);
            }
        }
        if (customLoaders?.loader) {
            this.loadersManager.addLoader(customLoaders.loader);
        }
    };
};

export default Chatterbox;
