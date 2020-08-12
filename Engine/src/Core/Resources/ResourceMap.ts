class MapEntry {
    private mAsset: any = null;
    private mRefCount: number = 1;

    constructor(rName: string) {
        this.mAsset = rName;
        this.mRefCount = 1;
    }

    public incAssetRefCount() {
        this.mRefCount += 1;
    }

    public getIncAssetRefCount() {
        return this.mRefCount;
    }

    public getAsset() {
        return this.mAsset;
    }
};

export default class ResourceMap {
    /**
     * Number of outstanding load operations
     * Is the number of resource load requests issued and not completed
     * When mNumOutsandingLoads becomes zero, the function referenced by mLoadCompleteCallback will be called.
     */
    private mNumOutstandingLoads: number;

    /**
     * Callback function when all textures are loaded
     */
    private mLoadCompleteCallback: any = null;

    /**
     * Resource storage
     */
    private mResourceMap: any = [];

    constructor() {
        this.mNumOutstandingLoads = 0;
        this.mLoadCompleteCallback = null;
        this.mResourceMap = [];
    }

   /*
    * Register one more resource to load
    */
    public asyncLoadRequested(rName: string) {
        this.mResourceMap[rName] = new MapEntry(rName); // place holder for the resource to be loaded
        ++this.mNumOutstandingLoads;
    };

    /**
     *
     * @param rName
     * @param loadedAsset
     */
    public asyncLoadCompleted(rName: string, loadedAsset: string) {
        if (!this.isAssetLoaded(rName)) {
            alert("gEngine.asyncLoadCompleted: [" + rName + "] not in map!");
        }

        this.mResourceMap[rName].mAsset = loadedAsset;
        --this.mNumOutstandingLoads;
        this._checkForAllLoadCompleted();
    };

    private _checkForAllLoadCompleted() {
        if ((this.mNumOutstandingLoads === 0) && (this.mLoadCompleteCallback !== null)) {
            // ensures the load complete call back will only be called once!
            let funToCall = this.mLoadCompleteCallback;
            this.mLoadCompleteCallback = null;
            funToCall();
        }
    };

    /**
     * Make sure to set the callback _AFTER_ all load commands are issued
     * @param funct
     */
    public setLoadCompleteCallback(funct: CallableFunction) {
        this.mLoadCompleteCallback = funct;
        // in case all loading are done
        this._checkForAllLoadCompleted();
    };

    /**
     *
     * @param rName
     */
    public retrieveAsset(rName: string) {
        let r = null;
        if (rName in this.mResourceMap) {
            r = this.mResourceMap[rName].mAsset;
        } else {
            alert("gEngine.retrieveAsset: [" + rName + "] not in map!");
        }
        return r;
    };

    /**
     *
     * @param rName
     */
    public isAssetLoaded(rName: string) {
        return (rName in this.mResourceMap);
    };

    /**
     *
     * @param rName
     */
    public incAssetRefCount(rName: string) {
        this.mResourceMap[rName].incAssetRefCount();
    };

    /**
     *
     * @param rName
     */
    public unloadAsset(rName: string) {
        if (rName in this.mResourceMap) {
            delete this.mResourceMap[rName];
        }
    };
}