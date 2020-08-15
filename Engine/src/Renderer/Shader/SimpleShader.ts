/**
 * Compile, Link, and Load the Vertex and Fragment Shader
 */
export default class SimpleShader {
    /**
     * WebGL Instance
     */
    protected _webGL: any;

    /**
     * Vertex Buffer Instance
     */
    protected _vertexBuffer: any;

    /**
     * Vertex Buffer Instance
     */
    protected _resourceMap: any;

    /**
     * reference to the compiled shader in webgl context
     */
    protected mCompiledShader: WebGLProgram = [];

    /**
     * reference to SquareVertexPosition within the shader
     */
    protected mShaderVertexPositionAttribute: number = 0;

    /**
     * reference to the pixelColor uniform in the fragment shader
     */
    protected uPixelColor: WebGLUniformLocation = 0;

    /**
     * reference to model transform matrix in vertex shader
     */
    protected modelTransform: WebGLUniformLocation = 0;

    /**
     * reference to the View/Projection matrix in the vertex shader
     */
    protected viewProjectionTransform: WebGLUniformLocation = 0;

    /**
     *
     * @param webGL
     * @param vertexBuffer
     */
    public constructor(webGL: WebGLRenderingContext, vertexBuffer: any, resourceMap: any) {
        this._webGL        = <WebGLRenderingContext> webGL;
        this._vertexBuffer = vertexBuffer;
        this._resourceMap = resourceMap
    }

    /**
     *
     * @param vertexShaderPath
     * @param fragmentShaderPath
     */
    public initialize(vertexShaderPath: string, fragmentShaderPath: string) : void {
        // Step A: load and compile vertex and fragment shaders
        let vertexShader = this.compileShader(vertexShaderPath, this._webGL.VERTEX_SHADER);
        let fragmentShader = this.compileShader(fragmentShaderPath, this._webGL.FRAGMENT_SHADER);
        this.createShaderProgram(vertexShader, fragmentShader)
    }

    /**
     * Creates the shader program
     * @param vertexShader
     * @param fragmentShader
     */
    protected createShaderProgram(vertexShader : any, fragmentShader: any) : void {
        // Step B: Create and link the shaders into a program.
        this.mCompiledShader = <WebGLProgram> this._webGL.createProgram();
        this._webGL.attachShader(this.mCompiledShader, vertexShader);
        this._webGL.attachShader(this.mCompiledShader, fragmentShader);
        this._webGL.linkProgram(this.mCompiledShader);

        // Step C: check for error
        if (!this._webGL.getProgramParameter(this.mCompiledShader, this._webGL.LINK_STATUS)) {
            console.log("Error linking shader");
        }

        this.mShaderVertexPositionAttribute = <number> this._webGL.getAttribLocation(
            this.mCompiledShader, "aSquareVertexPosition"
        );

        // Step E: Activates the vertex buffer loaded in EngineCore_VertexBuffer.js
        this._webGL.bindBuffer(this._webGL.ARRAY_BUFFER, this._vertexBuffer.getWebGLVertexReference());

        // Step F: Describe the characteristic of the vertex position attribute
        this._webGL.vertexAttribPointer(this.mShaderVertexPositionAttribute,
            3,                 // each element is a 3-float (x,y.z)
            this._webGL.FLOAT, // data type is FLOAT
            false,             // if the content is normalized vectors
            0,                 // number of bytes to skip in between elements
            0                  // offsets to the first element
        );

        // Step G: Gets a reference to the uniform variable uPixelColor in the fragment shader
        this.uPixelColor = <WebGLUniformLocation> this._webGL.getUniformLocation(this.mCompiledShader, "uPixelColor");
        this.modelTransform = <WebGLUniformLocation> this._webGL.getUniformLocation(this.mCompiledShader, "uModelTransform");
        this.viewProjectionTransform = <WebGLUniformLocation> this._webGL.getUniformLocation(this.mCompiledShader, "uViewProjTransform");
    }

    /**
     * loads the modelTransform matrix into webGL to be used by the vertex shader
     * @param modelTransform
     */
    public loadObjectTransform(modelTransform: any) {
            this._webGL.uniformMatrix4fv(this.modelTransform, false, modelTransform);
    };

    /**
     * Get the WebGLProgram Compiled Shader
     */
    public getSimpleShader() : WebGLProgram {
        return this.mCompiledShader;
    };

    /**
     * Active the shader program
     * @param pixelColor
     */
    public activateShader(pixelColor: Array<number>, vpMatrix: Array<number>) {
        // Step D: Gets a reference to the aSquareVertexPosition attribute within the shaders.

        this._webGL.useProgram(this.mCompiledShader);
        this._webGL.uniformMatrix4fv(this.viewProjectionTransform, false, vpMatrix);
        this._webGL.bindBuffer(this._webGL.ARRAY_BUFFER, this._vertexBuffer.getWebGLVertexReference());
        this._webGL.vertexAttribPointer(this.mShaderVertexPositionAttribute,
            3,                 // each element is a 3-float (x,y.z)
            this._webGL.FLOAT, // data type is FLOAT
            false,             // if the content is normalized vectors
            0,                 // number of bytes to skip in between elements
            0);                // offsets to the first element
        this._webGL.enableVertexAttribArray(this.mShaderVertexPositionAttribute);
        this._webGL.uniform4fv(this.uPixelColor, pixelColor);
    };

    /**
     * Loading Shaders
     * @param filePath
     * @param shaderType
     */
    protected compileShader(filePath: string, shaderType: number) : WebGLShader {
        let shaderSource: any, compiledShader: any, xmlReq;

        // Step A: Access the shader textfile
        shaderSource = this._resourceMap.retrieveAsset(filePath);

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