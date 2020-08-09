import GameLoop from './GameLoop';
import WebGL from './WebGL';
import VertexBuffer from './VertexBuffer';
import Camera from '../Scene/Camera';
import Input from '../Events/Input/Input';
import DefaultResourcesLoader from './Resources/DefaultResourcesLoader';
import ResourceMap from './Resources/ResourceMap';

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
     * Input Manager Instance
     */
    private _input: Input;

    /**
     * ResourceMap Instance
     */
    private _resourceMap: ResourceMap;

    /**
     * DefaultResourcesLoader Instance
     */
    private _defaultResourcesLoader: DefaultResourcesLoader;


    /**
     * Constructor
     * @param htmlCanvasID Canvas id on HTML Document
     */
    constructor(htmlCanvasID: string) {
        this._webGL        = new WebGL(htmlCanvasID).getWebGL();
        this._vertexBuffer = new VertexBuffer(this._webGL);
        this._input        = new Input;
        this._resourceMap = new ResourceMap;
        this._defaultResourcesLoader = new DefaultResourcesLoader(
            this._webGL,
            this._vertexBuffer,
            this._resourceMap
        );
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
     * Accessor of the Camera Viewport object
     */
    public getCamera() : Camera {
        return new Camera(this._webGL);
    }

    /**
     * Accessor of the Camera Viewport object
     */
    public getInput() : Input {
        return this._input;
    }

    /**
     *
     */
    public getShader() {
        return this._defaultResourcesLoader.getShader();
    }

    /**
     * Init Game Engine
     */
    init(scripts: any) : Engine {
        this._vertexBuffer.initialize();
        this._input.initialize();
        this._defaultResourcesLoader.initialize(() => this.startScene(scripts));
        return this;
    };

    /**
     * Start the game scene
     * @param scripts
     */
    startScene(scripts: any) {
        /**
         * initialize the GameLoop
         */
        (new GameLoop(this)).start(scripts);
    }

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