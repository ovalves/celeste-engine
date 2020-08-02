/*
 * File: VertexBuffer.js
 *
 * Support the loading of the buffer that contains vertex positions of a square
 * onto the gGL context
 */

/*jslint node: true, vars: true */
/*global gGL: false, alert: false, loadAndCompileShader: false,
    document: false, Float32Array: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict"; // Operate in Strict mode such that variables must be declared before used!

export default class VertexBuffer {
    private _webGL: any = null;
    private gSquareVertexBuffer: any = null;
    private mSquareVertexBuffer: any = null;
    private verticesOfSquare: any = null;

    constructor(webGL: any) {
        // The WebGL object reference
        this._webGL = webGL;

        // gGL reference to the vertex positions for the square
        this.gSquareVertexBuffer = null;

        this.mSquareVertexBuffer = null;

        this.verticesOfSquare = [
            0.5, 0.5, 0.0, -0.5, 0.5, 0.0,
            0.5, -0.5, 0.0, -0.5, -0.5, 0.0
        ];
    }

    initialize() {
        // Step A: Create a buffer on the gGL context for our vertex positions

        this.mSquareVertexBuffer = this._webGL.createBuffer();

        // Step B: Activate vertexBuffer
        this._webGL.bindBuffer(this._webGL.ARRAY_BUFFER, this.mSquareVertexBuffer);

        // Step C: Loads verticesOfSquare into the vertexBuffer
        this._webGL.bufferData(this._webGL.ARRAY_BUFFER, new Float32Array(this.verticesOfSquare), this._webGL.STATIC_DRAW);
    };

    getGLVertexRef() {
        return this.mSquareVertexBuffer;
    };
}