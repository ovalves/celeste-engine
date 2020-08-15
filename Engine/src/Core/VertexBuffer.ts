/**
 * Support the loading of the buffer that contains vertex positions of a square onto the gGL context
 */
export default class VertexBuffer {

    /**
     * WebGL Instance
     */
    private _webGL: WebGLRenderingContext;

    /**
     * Reference to the vertex positions for the square
     */
    private squareVertexBuffer: WebGLBuffer;

    /**
     * reference to the texture positions for the square vertices in the gl context
     */
    private textureCoordinatesBuffer: WebGLBuffer;

    /**
     * Vertices to draw the square element
     */
    private verticesOfSquare: Array<number>;

    /**
     * Vertices to draw the corresponding texture coordinates
     */
    private textureCoordinates: Array<number>;

    /**
     *
     * @param webGL
     */
    constructor(webGL: WebGLRenderingContext) {
        this._webGL  = <WebGLRenderingContext> webGL;

        /**
         * Create a buffer on the gGL context for our vertex positions
         */
        this.squareVertexBuffer = <WebGLBuffer> this._webGL.createBuffer();

        /**
         * Create a buffer on the gGL context for our vertex positions
         */
        this.textureCoordinatesBuffer = <WebGLBuffer> this._webGL.createBuffer();

        /**
         * define the vertices for a square
         */
        this.verticesOfSquare   = [
            0.5, 0.5, 0.0,
            -0.5, 0.5, 0.0,
            0.5, -0.5, 0.0,
            -0.5, -0.5, 0.0
        ];

        /**
         * define the corresponding texture coordinates
         */
        this.textureCoordinates = [
            1.0, 1.0,
            0.0, 1.0,
            1.0, 0.0,
            0.0, 0.0
        ];
    }

    /**
     * Initialize Vertex Buffer
     */
    public initialize() : this {
        this.initSquareVertex();
        this.initTextureVertex();
        return this;
    };

    /**
     * Get Graphics Library Reference Buffer
     */
    public getWebGLVertexReference() : WebGLBuffer {
        return this.squareVertexBuffer;
    };

    public getWebGLTextureCoordinatesReference () : WebGLBuffer {
        return this.textureCoordinatesBuffer;
    };

    /**
     * Init the vertex buffer to square shader
     */
    private initSquareVertex() : void {
        /**
         * Activate vertexBuffer
         */
        this._webGL.bindBuffer(
            this._webGL.ARRAY_BUFFER,
            this.squareVertexBuffer
        );

        /**
         * Loads verticesOfSquare into the vertexBuffer
         */
        this._webGL.bufferData(
            this._webGL.ARRAY_BUFFER,
            new Float32Array(
                this.verticesOfSquare
            ),
            this._webGL.STATIC_DRAW
        );
    }

    /**
     * Init the vertex buffer to texture shader
     */
    private initTextureVertex() : void {
        /**
         * Activate vertexBuffer
         */
        this._webGL.bindBuffer(
            this._webGL.ARRAY_BUFFER,
            this.textureCoordinatesBuffer
        );

        /**
         * Loads textureCoordinates into the vertexBuffer
         */
        this._webGL.bufferData(
            this._webGL.ARRAY_BUFFER,
            new Float32Array(
                this.textureCoordinates
            ),
            this._webGL.STATIC_DRAW
        );
    }
}