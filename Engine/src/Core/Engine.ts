"use strict"; // Operate in Strict mode

// initialize the variable while ensuring it is not redefined

import WebGL from './WebGL';
import VertexBuffer from '../VertexBuffer';
import SimpleShader from '../SimpleShader';

export default class Engine {
    private _webGL: any = null;
    private _vertexBuffer: any = null;
    private _shader: any = null;

    constructor(htmlCanvasID: string) {
        this._webGL = new WebGL(htmlCanvasID).getWebGL();
        this._vertexBuffer = new VertexBuffer(this._webGL);

        /**
         * @todo Creating a simple User Defined Shader | Defined in index.html
         */
        this._shader = new SimpleShader(
            this,
            "VertexShader",
            "FragmentShader"
        );
    }

    // Accessor of the webgl context
    getGL() {
        return this._webGL;
    };

    getVertexBuffer() {
        return this._vertexBuffer;
    };

    getShader() {
        return this._shader;
    };

    init() {
        // now initialize the VertexBuffer
        this._vertexBuffer.initialize();

        // Create, load and compile the shaders
        this._shader.initialize();

        return this;
    };

    clearCanvas(color: string) {
        this._webGL.clearColor(color[0], color[1], color[2], color[3]); // set the color to be cleared
        this._webGL.clear(this._webGL.COLOR_BUFFER_BIT); // clear to the color previously set
    };
}