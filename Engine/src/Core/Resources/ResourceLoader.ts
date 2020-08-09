export default class ResourceLoader {
    /**
     * ResourceMap Instance
     */
    private resourceMap: any;

    /**
     * Define the different types of text files to be loaded, such as XML or plain text
     */
    public MAPPED_FILE_TYPE = {
        XML_FILE: 0,
        TEXT_FILE: 1
    };

    /**
     * Constructor
     * @param ResourceMap
     */
    constructor(ResourceMap: any) {
        this.resourceMap = ResourceMap;
    }

    /**
     * Return the mapped load file type
     */
    public getMappedFileType() {
        return this.MAPPED_FILE_TYPE;
    }

    /**
     * Asynchronously request the data from server.
     * @param fileName
     * @param fileType
     * @param callbackFunction
     */
    public load(fileName: string, fileType: number, callbackFunction: CallableFunction) {
        let that = this;
        let req = new XMLHttpRequest();

        req.onreadystatechange = function () {
            if ((req.readyState === 4) && (req.status !== 200)) {
                alert(fileName + ": loading failed! [Hint: you cannot double click index.html to run this project. " +
                    "The index.html file must be loaded by a web-server.]");
            }
        };
        req.open('GET', fileName, true);
        req.setRequestHeader('Content-Type', 'text/xml');


        req.onload = function () {
            let fileContent = null;
            if (fileType === that.MAPPED_FILE_TYPE.XML_FILE) {
                let parser = new DOMParser();
                fileContent = parser.parseFromString(req.responseText, "text/xml");
            } else {
                fileContent = req.responseText;
            }
            that.resourceMap.asyncLoadCompleted(fileName, fileContent);
            if ((callbackFunction !== null) && (callbackFunction !== undefined)) {
                callbackFunction(fileName);
            }
        };
        req.send();
    };
}