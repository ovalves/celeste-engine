import GameLoop from './GameLoop';
import WebGL from './WebGL';
import VertexBuffer from './VertexBuffer';
import Camera from '../Scene/Camera';
import SceneManager from '../Scene/SceneManager';
import Input from '../Events/Input/Input';
import DefaultResourcesLoader from './Resources/DefaultResourcesLoader';
import ResourceMap from './Resources/ResourceMap';
import AudioManager from '../Audio/AudioManager';

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
     * Game loop Instance
     */
    private _gameLoop: any;

    /**
     * Scene Manager Instance
     */
    private _sceneManager: any;

    /**
     * Audio Manager Instance
     */
    private _audioManager: any;

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
        this._audioManager = new AudioManager(this._resourceMap);
        this._sceneManager = new SceneManager(this._webGL, this._defaultResourcesLoader);
        this._gameLoop = new GameLoop(this);
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
     * Accessor of the Input Manager object
     */
    public getInput() : Input {
        return this._input;
    }

    /**
     * Accessor of the Shader object
     */
    public getShader() {
        return this._defaultResourcesLoader.getShader();
    }

    /**
     * Accessor of the ResourceMap object
     */
    public getResourceMap() : ResourceMap {
        return this._resourceMap;
    }

    /**
     * Init Game Engine
     */
    init() : Engine {
        this._vertexBuffer.initialize();
        this._input.initialize();
        this._sceneManager.setAudioManager(this._audioManager);
        this._defaultResourcesLoader.initialize(() => this.startScene(null));
        return this;
    };

    /**
     * Start the game scene
     * Initialize the GameLoop
     * @param scripts
     */
    public startScene(sceneName: string) {
        this._sceneManager.loadScene(
            sceneName,
            this._gameLoop
        );
    }

    /**
     *
     * @param sceneName
     */
    public changeScene(sceneName: string) {
        this._gameLoop.stop();
        this._sceneManager.loadScene(
            sceneName,
            this._gameLoop
        );
    }

    /**
    * Return the audio manager instance
    */
    public getAudio() : AudioManager {
        return this._audioManager;
    }

    /**
     * Clear Canvas HTML element
     * @param color
     */
    public clearCanvas(color: Array<number>) {
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