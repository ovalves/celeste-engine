export default class TextFileLoader {
    /**
     * ResourceMap Instance
     */
    private resourceMap: any;

    /**
     * Define the different types of text files to be loaded, such as XML or plain text
     */
    private resourceLoader: any;

    constructor(resourceMap: any, resourceLoader: any) {
        this.resourceMap = resourceMap;
        this.resourceLoader = resourceLoader;
    }

    // if fileType is a eTextFileType
    public loadTextFile(fileName: string, fileType: number, callbackFunction: CallableFunction) {
        if (this.resourceMap.isAssetLoaded(fileName)) {
            if ((callbackFunction !== null) && (callbackFunction !== undefined)) {
                callbackFunction(fileName);
            }

            return;
        }

        // Update resources in load counter.
        this.resourceMap.asyncLoadRequested(fileName);

        // Asynchronously request the data from server.
        this.resourceLoader.load(fileName, fileType, callbackFunction);
    };

    public unloadTextFile(fileName: string) {
        this.resourceMap.unloadAsset(fileName);
    };
}