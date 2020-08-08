import GameLoop from './GameLoop';
import WebGL from './WebGL';
import VertexBuffer from './VertexBuffer';
import SimpleShader from '../Renderer/Shader/SimpleShader';
import Camera from '../Scene/Camera';

/**
 * Game Engine Core Class
 */
export default class Engine {
    /**
     * WebGL Instance
     */
    private _webGL: WebGLRenderingContext;

    /**
     * Vertex Buffer Instance
     */
    private _vertexBuffer: VertexBuffer;

    /**
     * Shader Instance
     */
    private _shader: SimpleShader;

    /**
     * Constructor
     * @param htmlCanvasID Canvas id on HTML Document
     */
    constructor(htmlCanvasID: string) {
        this._webGL        = new WebGL(htmlCanvasID).getWebGL();
        this._vertexBuffer = new VertexBuffer(this._webGL);
        this._shader       = new SimpleShader();
    }

    /**
     * Accessor of the webgl context
     */
    public getGL() : WebGLRenderingContext {
        return this._webGL;
    }

    /**
     * Accessor of the VertexBuffer context
     */
    public getVertexBuffer() : VertexBuffer {
        return this._vertexBuffer;
    }

    /**
     * Accessor of the SimpleShader context
     */
    public getShader() : SimpleShader {
        return this._shader;
    }

    /**
     * Accessor of the Camera Viewport object
     */
    public getCamera() : Camera {
        return new Camera(this._webGL);
    }

    /**
     * Init Game Engine
     */
    init(scripts: any) : Engine {
        /**
         * initialize the VertexBuffer
         */
        this._vertexBuffer.initialize();

        /**
         * initialize the shaders
         */
        this._shader.initialize(
            this._webGL,
            this._vertexBuffer
        );

        /**
         * initialize the GameLoop
         */
        (new GameLoop(this)).start(scripts);
        return this;
    };

    /**
     * Clear Canvas HTML element
     * @param color
     */
    clearCanvas(color: Array<number>) {
        /**
         * set the color to be cleared
         */
        this._webGL.clearColor(
            color[0],
            color[1],
            color[2],
            color[3]
        );

        /**
         * clear to the color previously set
         */
        this._webGL.clear(this._webGL.COLOR_BUFFER_BIT);
    };
}