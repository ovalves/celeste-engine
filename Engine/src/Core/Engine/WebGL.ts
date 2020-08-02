
export default class WebGL {
    private htmlCanvasID: string;
    private webGL: WebGLRenderingContext;

    constructor(htmlCanvasID: string) {
        this.htmlCanvasID = htmlCanvasID;
        this.webGL = this.initializeWebGL();
    }

    /**
     * Initialize the Web Graphics Library
     */
    private initializeWebGL() : WebGLRenderingContext {
        let canvas = <HTMLCanvasElement> document.getElementById(this.htmlCanvasID);

        // Get the standard or experimental webgl and binds to the Canvas area
        // store the results to the instance variable webGL
        let webGL = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        if (webGL === null) {
            document.write("<br><b>WebGL is not supported!</b>");
        }

        return <WebGLRenderingContext> webGL;
    };

    /**
     * Accessor of the webgl context
     */
    getWebGL() : WebGLRenderingContext{
        return this.webGL;
    };
}