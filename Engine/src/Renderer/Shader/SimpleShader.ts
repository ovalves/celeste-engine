/**
 * Compile, Link, and Load the Vertex and Fragment Shader
 */
export default class SimpleShader {
    /**
     * WebGL Instance
     */
    private _webGL: any;

    /**
     * Vertex Buffer Instance
     */
    private _vertexBuffer: any;

    /**
     * reference to the compiled shader in webgl context
     */
    private mCompiledShader: WebGLProgram = [];

    /**
     * reference to SquareVertexPosition within the shader
     */
    private mShaderVertexPositionAttribute: number = 0;

    /**
     * reference to the pixelColor uniform in the fragment shader
     */
    private uPixelColor: WebGLUniformLocation = 0;

    /**
     * reference to the transform uniform of shader
     */
    private modelTransform: WebGLUniformLocation = 0;

    /**
     *
     * @param webGL
     * @param vertexBuffer
     */
    public initialize(webGL: WebGLRenderingContext, vertexBuffer: any) : void {
        this._webGL        = <WebGLRenderingContext> webGL;
        this._vertexBuffer = vertexBuffer;
    }

    /**
     *
     * @param vertexShaderPath
     * @param fragmentShaderPath
     */
    public addShader(vertexShaderPath: string, fragmentShaderPath: string) : void {
        // Step A: load and compile vertex and fragment shaders
        let vertexShader = this.loadAndCompileShader(vertexShaderPath, this._webGL.VERTEX_SHADER);
        let fragmentShader = this.loadAndCompileShader(fragmentShaderPath, this._webGL.FRAGMENT_SHADER);
        this.createShaderProgram(vertexShader, fragmentShader)
    }

    /**
     * Creates the shader program
     * @param vertexShader
     * @param fragmentShader
     */
    private createShaderProgram(vertexShader : any, fragmentShader: any) : void {
        // Step B: Create and link the shaders into a program.
        this.mCompiledShader = <WebGLProgram> this._webGL.createProgram();
        this._webGL.attachShader(this.mCompiledShader, vertexShader);
        this._webGL.attachShader(this.mCompiledShader, fragmentShader);
        this._webGL.linkProgram(this.mCompiledShader);

        // Step C: check for error
        if (!this._webGL.getProgramParameter(this.mCompiledShader, this._webGL.LINK_STATUS)) {
            console.log("Error linking shader");
        }

        // Step D: Gets a reference to the aSquareVertexPosition attribute within the shaders.
        this.mShaderVertexPositionAttribute = <number> this._webGL.getAttribLocation(
            this.mCompiledShader, "aSquareVertexPosition"
        );

        // Step E: Activates the vertex buffer loaded in EngineCore_VertexBuffer.js
        this._webGL.bindBuffer(this._webGL.ARRAY_BUFFER, this._vertexBuffer.getGLVertexRef());

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
    }

    /**
     * loads the modelTransform matrix into webGL to be used by the vertex shader
     * @param modelTransform
     */
    public loadObjectTransform (modelTransform: any) {
            this._webGL.uniformMatrix4fv(this.modelTransform, false, modelTransform);
    };

    /**
     * Get the WebGLProgram Compiled Shader
     */
    public getShader() : WebGLProgram{
        return this.mCompiledShader;
    };

    /**
     * Active the shader program
     * @param pixelColor
     */
    public activateShader(pixelColor: Array<number>) {
        this._webGL.useProgram(this.mCompiledShader);
        this._webGL.bindBuffer(this._webGL.ARRAY_BUFFER, this._vertexBuffer.getGLVertexRef());
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
    private loadAndCompileShader(filePath: string, shaderType: number) : WebGLShader{
        let shaderSource: any, compiledShader: any, xmlReq;

        // Step A: Request the text from the given file location.
        shaderSource = this.getShaderSource(filePath);

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

    /**
     * Get the shader source from shaders folder
     * @param filePath
     */
    private getShaderSource(filePath: string) : string {
        let shaderSource: any,

        xmlReq = new XMLHttpRequest();
        xmlReq.open('GET', filePath, false);
        try {
            xmlReq.send();
        } catch (error) {
            alert("Failed to load shader: " + filePath + " [Hint: you cannot double click index.html to run this project. " +
                    "The index.html file must be loaded by a web-server.]");
        }
        shaderSource = xmlReq.responseText;

        if (shaderSource === null) {
            alert("WARNING: Loading of:" + filePath + " Failed!");
        }

        return shaderSource;
    }
}