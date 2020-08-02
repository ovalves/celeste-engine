/*
 * File: WebGL.js
 * Javascript source code for our project.
 */

/* The following two lines of comment are directions for jsLint
 *      jslint: defines jsLint checking options,
 *              e.g., "node: true" says "use strict" will be applied to the entire file.
 *      global: tells jsLint which are the defined global variables
 *              e.g., "document: false" says "document" is a defined global variable
 */
/*jslint node: true, vars: true, evil: true */
/*global initSquareBuffer: false, initSimpleShader: false, document: false,
    gSimpleShader: false, gShaderVertexPositionAttribute: false*/
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict"; // Operate in Strict mode such that variables must be declared before used!

export default class WebGL {
    private htmlCanvasID: any = null;
    private _webGL: any = null;
    private canvas: any = null;

    constructor(htmlCanvasID: string) {
        this.htmlCanvasID = htmlCanvasID;
        this._webGL = this._initializeWebGL();
    }

    // initialize the WebGL, the vertex buffer and compile the shaders
    _initializeWebGL() {
        this.canvas = document.getElementById(this.htmlCanvasID);

        // Get the standard or experimental webgl and binds to the Canvas area
        // store the results to the instance variable webGL
        let webGL = this.canvas.getContext("webgl") || this.canvas.getContext("experimental-webgl");
        if (webGL === null) {
            document.write("<br><b>WebGL is not supported!</b>");
            return;
        }

        return webGL;
    };

    // Accessor of the webgl context
    getWebGL() {
        return this._webGL;
    };
}