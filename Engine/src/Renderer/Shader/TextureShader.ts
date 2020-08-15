import SimpleShader from './SimpleShader';

/**
 * Compile, Link, and Load the Vertex and Fragment Shader
 */
export default class TextureShader extends SimpleShader {

    /**
     * reference to SquareVertexPosition within the shader
     */
    protected mShaderTextureCoordAttribute: number = 0;

    /**
     *
     * @param webGL
     * @param vertexBuffer
     */
    public constructor(webGL: WebGLRenderingContext, vertexBuffer: any, resourceMap: any) {
        super(webGL, vertexBuffer, resourceMap);
    }

    /**
     *
     * @param vertexShaderPath
     * @param fragmentShaderPath
     */
    public initialize(vertexShaderPath: string, fragmentShaderPath: string) : void {
        super.initialize(vertexShaderPath, fragmentShaderPath);
        this.mShaderTextureCoordAttribute = this._webGL.getAttribLocation(this.mCompiledShader, "aTextureCoordinate");
    }

    /**
     * Active the shader program
     * @param pixelColor
     */
    public activateShader(pixelColor: Array<number>, vpMatrix: Array<number>) {

        super.activateShader(pixelColor, vpMatrix);

        this._webGL.bindBuffer(
            this._webGL.ARRAY_BUFFER,
            this._vertexBuffer.getWebGLTextureCoordinatesReference()
        );

        this._webGL.enableVertexAttribArray(
            this.mShaderTextureCoordAttribute
        );

        this._webGL.vertexAttribPointer(
            this.mShaderTextureCoordAttribute,
            2,
            this._webGL.FLOAT,
            false,
            0,
            0
        );
    };
}