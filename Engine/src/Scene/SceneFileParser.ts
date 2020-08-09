import * as path from 'path'

export default class SceneFileParser {
    /**
     * ResourceMap Instance
     */
    private _resourceMap: any;

    /**
     * DefaultResourcesLoader Instance
     */
    private _textFileLoader: any;

    /**
     *
     */
    private sceneXmlDocument: XMLDocument;

    /**
     *
     * @param defaultResourcesLoader
     * @param resourceMap
     */
    constructor(resourceMap: any, textFileLoader: any) {
        this._resourceMap = resourceMap;
        this._textFileLoader = textFileLoader;
    }

    /**
     *
     * @param tagElm
     */
    private getElm (tagElm: string) {
        let theElm = this.sceneXmlDocument.getElementsByTagName(tagElm);
        if (theElm.length === 0) {
            console.error("Warning: Level element:[" + tagElm + "]: is not found!");
        }

        return theElm;
    };

    /**
     *
     * @param sceneName
     */
    public parse(sceneName: string) {
        this.sceneXmlDocument = this._resourceMap.retrieveAsset(sceneName);
        this.parseScripts();
    }

    public parseScripts() {
        let scriptElm = this.getElm("script");
        let src = scriptElm[0].getAttribute("src");
        let clas = scriptElm[0].getAttribute("class");

        const file = require(path.join(__dirname, '../../', src));
        console.log(file.teste.draw());

        /**
         * Carregando o arquivo js por ajax
         */
        // this._textFileLoader.loadTextFile(
        //     src,
        //     1,
        //     () => this.instantiateScriptClass(src, clas)
        // );
    }

    private instantiateScriptClass(src: any, clas: any) {
        const Customer2 = require(path.join(__dirname, '../../', src));
    }

    // public parseCamera() {
    //     let camElm = this.getElm("Camera");
    //     let cx = Number(camElm[0].getAttribute("CenterX"));
    //     let cy = Number(camElm[0].getAttribute("CenterY"));
    //     let w = Number(camElm[0].getAttribute("Width"));
    //     let viewport = camElm[0].getAttribute("Viewport").split(" ");
    //     let bgColor = camElm[0].getAttribute("BgColor").split(" ");
    //     // make sure viewport and color are number
    //     let j;

    //     for (j = 0; j < 4; j++) {
    //         let bgColor[j]: Array<number> = Number(bgColor[j]);
    //         viewport[j] = Number(viewport[j]);
    //     }

    //     let camera = new Camera(
    //         vec2.fromValues(cx, cy),  // position of the camera
    //         w,                        // width of camera
    //         viewport                  // viewport (orgX, orgY, width, height)
    //     );
    //     camera.setBackgroundColor(bgColor);
    //     return camera;
    // };

    // parseSquares(sqSet) {
    //     var elm = this.getElm("Square");
    //     var i, j, x, y, w, h, r, c, sq;
    //     for (i = 0; i < elm.length; i++) {
    //         x = Number(elm.item(i).attributes.getNamedItem("PosX").value);
    //         y = Number(elm.item(i).attributes.getNamedItem("PosY").value);
    //         w = Number(elm.item(i).attributes.getNamedItem("Width").value);
    //         h = Number(elm.item(i).attributes.getNamedItem("Height").value);
    //         r = Number(elm.item(i).attributes.getNamedItem("Rotation").value);
    //         c = elm.item(i).attributes.getNamedItem("Color").value.split(" ");
    //         sq = new Renderable(gEngine.DefaultResources.getConstColorShader());
    //         // make sure color array contains numbers
    //         for (j = 0; j < 4; j++) {
    //             c[j] = Number(c[j]);
    //         }
    //         sq.setColor(c);
    //         sq.getXform().setPosition(x, y);
    //         sq.getXform().setRotationInDegree(r); // In Degree
    //         sq.getXform().setSize(w, h);
    //         sqSet.push(sq);
    //     }
    // };
}
