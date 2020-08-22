import SimpleShader from './SimpleShader';

/**
 * Compile, Link, and Load the Vertex and Fragment Shader
 */
export default class SpriteShader extends SimpleShader {

    /**
     * reference to SquareVertexPosition within the shader
     */
    protected mShaderTextureCoordAttribute: number = 0;

    /**
     *
     */
    protected mTexCoordBuffer: any = null;

    /**
     *
     */
    protected initTexCoord: any = [
        1.0, 1.0,
        0.0, 1.0,
        1.0, 0.0,
        0.0, 0.0
    ];

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


        this.mTexCoordBuffer = this._webGL.createBuffer();
        this._webGL.bindBuffer(
            this._webGL.ARRAY_BUFFER,
            this.mTexCoordBuffer
        );

        this._webGL.bufferData(
            this._webGL.ARRAY_BUFFER,
            new Float32Array(this.initTexCoord),
            this._webGL.DYNAMIC_DRAW
        );
    }

    /**
     * Active the shader program
     * @param pixelColor
     */
    public activateShader(pixelColor: Array<number>, vpMatrix: Array<number>) {

        super.activateShader(pixelColor, vpMatrix);

        this._webGL.bindBuffer(
            this._webGL.ARRAY_BUFFER,
            this.mTexCoordBuffer
        );

        this._webGL.vertexAttribPointer(
            this.mShaderTextureCoordAttribute,
            2,
            this._webGL.FLOAT,
            false,
            0,
            0
        );

        this._webGL.enableVertexAttribArray(
            this.mShaderTextureCoordAttribute
        );
    };

    /**
     *
     * @param texCoord
     */
    public setTextureCoordinate(texCoord: any) {
        this._webGL.bindBuffer(
            this._webGL.ARRAY_BUFFER,
            this.mTexCoordBuffer
        );

        this._webGL.bufferSubData(
            this._webGL.ARRAY_BUFFER,
            0,
            new Float32Array(texCoord)
        );
    };
}