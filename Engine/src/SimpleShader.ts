/*
 * File: SimpleShader.js
 *
 * Implements a SimpleShader object.
 *
 */
/*jslint node: true, vars: true */
/*global gEngine: false, document: false, alert: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict"; // Operate in Strict mode such that variables must be declared before used!

//<editor-fold desc="constructor">
// constructor of SimpleShader object
export default class SimpleShader {
    private _webGL: any = null;
    private _vertexBuffer: any = null;
    private vertexShaderID: any = null;
    private fragmentShaderID: any = null;
    private mCompiledShader: any = null;
    private mShaderVertexPositionAttribute: any = null;

    constructor(engine: any, vertexShaderID: string, fragmentShaderID: string) {
        this._webGL = engine.getGL();
        this._vertexBuffer = engine.getVertexBuffer();
        this.vertexShaderID = vertexShaderID;
        this.fragmentShaderID = fragmentShaderID;

        // instance variables
        // Convention: all instance variables: mVariables
        this.mCompiledShader = null; // reference to the compiled shader in webgl context
        this.mShaderVertexPositionAttribute = null; // reference to SquareVertexPosition within the shader
    }

    public initialize() : void {
        // this._webGL = webGL;

        // Step A: load and compile vertex and fragment shaders
        var vertexShader = this._loadAndCompileShader(this.vertexShaderID, this._webGL.VERTEX_SHADER);
        var fragmentShader = this._loadAndCompileShader(this.fragmentShaderID, this._webGL.FRAGMENT_SHADER);

        // Step B: Create and link the shaders into a program.
        this.mCompiledShader = this._webGL.createProgram();
        this._webGL.attachShader(this.mCompiledShader, vertexShader);
        this._webGL.attachShader(this.mCompiledShader, fragmentShader);
        this._webGL.linkProgram(this.mCompiledShader);

        // Step C: check for error
        if (!this._webGL.getProgramParameter(this.mCompiledShader, this._webGL.LINK_STATUS)) {
            console.log("Error linking shader");
        }

        // Step D: Gets a reference to the aSquareVertexPosition attribute within the shaders.
        this.mShaderVertexPositionAttribute = this._webGL.getAttribLocation(
            this.mCompiledShader, "aSquareVertexPosition"
        );

        // Step E: Activates the vertex buffer loaded in EngineCore_VertexBuffer.js
        this._webGL.bindBuffer(this._webGL.ARRAY_BUFFER, this._vertexBuffer.getGLVertexRef());

        // Step F: Describe the characteristic of the vertex position attribute
        this._webGL.vertexAttribPointer(this.mShaderVertexPositionAttribute,
            3, // each element is a 3-float (x,y.z)
            this._webGL.FLOAT, // data type is FLOAT
            false, // if the content is normalized vectors
            0, // number of bytes to skip in between elements
            0 // offsets to the first element
        );
    }

    getShader() {
        return this.mCompiledShader;
    };

    activateShader() {
        this._webGL.useProgram(this.mCompiledShader);
        this._webGL.bindBuffer(this._webGL.ARRAY_BUFFER, this._vertexBuffer.getGLVertexRef());
        this._webGL.vertexAttribPointer(this.mShaderVertexPositionAttribute,
            3, // each element is a 3-float (x,y.z)
            this._webGL.FLOAT, // data type is FLOAT
            false, // if the content is normalized vectors
            0, // number of bytes to skip in between elements
            0); // offsets to the first element
        this._webGL.enableVertexAttribArray(this.mShaderVertexPositionAttribute);
    };

    _loadAndCompileShader(id: string, shaderType: number) {
        let shaderText: any, shaderSource: any, compiledShader: any;

        // Step A: Get the shader source from index.html
        shaderText = document.getElementById(id);
        shaderSource = shaderText.firstChild.textContent;

        // Step B: Create the shader based on the shader type: vertex or fragment
        compiledShader = this._webGL.createShader(shaderType);

        // Step C: Compile the created shader
        this._webGL.shaderSource(compiledShader, shaderSource);
        this._webGL.compileShader(compiledShader);

        // Step D: check for errors and return results (null if error)
        // The log info is how shader compilation errors are typically displayed.
        // This is useful for debugging the shaders.
        if (!this._webGL.getShaderParameter(compiledShader, this._webGL.COMPILE_STATUS)) {
            console.log("A shader compiling error occurred: " + this._webGL.getShaderInfoLog(compiledShader));
        }


        return compiledShader;
    };
}