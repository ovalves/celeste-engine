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
     * Vertices to draw the square element
     */
    private verticesOfSquare: Array<number>;

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
        this.verticesOfSquare   = [
            0.5, 0.5, 0.0, -0.5, 0.5, 0.0,
            0.5, -0.5, 0.0, -0.5, -0.5, 0.0
        ];
    }

    /**
     * Initialize Vertex Buffer
     */
    initialize() {
        /**
         * Activate vertexBuffer
         */
        this._webGL.bindBuffer(this._webGL.ARRAY_BUFFER, this.squareVertexBuffer);

        /**
         * Loads verticesOfSquare into the vertexBuffer
         */
        this._webGL.bufferData(
            this._webGL.ARRAY_BUFFER,
            new Float32Array(this.verticesOfSquare), this._webGL.STATIC_DRAW
        );
    };

    /**
     * Get Graphics Library Reference Buffer
     */
    getGLVertexRef() : WebGLBuffer {
        return this.squareVertexBuffer;
    };
}