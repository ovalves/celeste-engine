import * as path from 'path'

export default class SceneFileParser {
    /**
     * ResourceMap Instance
     */
    private _resourceMap: any;

    /**
     * Dados do arquivo XML da cena
     */
    private sceneXmlDocument: XMLDocument;

    /**
     * Scripts carregados presentes na cena
     */
    private loadedScripts: Array<number|Object> = [];

    /**
     * Constructor
     * @param resourceMap
     * @param textFileLoader
     */
    constructor(resourceMap: any) {
        this._resourceMap = resourceMap;
    }

    /**
     * Retorna o elemento presente no XML da cena
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
     *  Retorna os script presentes na cena
     * @param sceneName
     */
    public getLoadedScripts() : Array<number|Object> {
        return this.loadedScripts;
    }

    /**
     * Parseia os dados do arquivo XML da cena
     * @param sceneName
     */
    public parse(sceneName: string) : void {
        this.sceneXmlDocument = this._resourceMap.retrieveAsset(sceneName);
        this.parseScripts();
    }

    /**
     * Parseia os dados dos scripts no arquivo de XML da cena
     */
    public parseScripts() {
        let scriptElm = this.getElm("script");
        for (let index = 0; index < scriptElm.length; index++) {
            let src = scriptElm[index].getAttribute("src");
            let script = require(path.join(__dirname, '../../', src));
            this.loadedScripts.push(script);
        }
    }

    // public parseCamera() {
    //     let camElm = this.getElm("Camera");
    //     let cx = Number(camElm[0].getAttribute("CenterX"));
    //     let cy = Number(camElm[0].getAttribute("CenterY"));
    //     let w = Number(camElm[0].getAttribute("Width"));
    //     let viewport = camElm[0].getAttribute("Viewport").split(" ");
    //     let bgColor: Array<string> = camElm[0].getAttribute("BgColor").split(" ");
    //     // make sure viewport and color are number
    //     let j;

    //     for (j = 0; j < 4; j++) {
    //         let bgColor[j]: Array<string> = Number(bgColor[j]);
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
