import ResourceMap from './ResourceMap';
import ResourceLoader from './ResourceLoader';
import TextFileLoader from './TextFileLoader';
import SimpleShader from '../../Renderer/Shader/SimpleShader';
import SceneFileParser from '../../Scene/SceneFileParser';

export default class DefaultResourcesLoader {
    private _webGL: WebGLRenderingContext;
    private _vertexBuffer: any;
    private _shader: SimpleShader;
    private _resourceMap: ResourceMap;
    private resourceLoader: ResourceLoader;
    private textFileLoader: TextFileLoader;
    /**
     * SceneFileParser Instance
     */
    private _sceneFileParser: SceneFileParser;

    /**
     * Simple Shader
     */
    private kSimpleVS: string;
    private kSimpleFS: string;
    private mainSceneFile: string;

    /**
     *
     * @param resourceMap
     */
    constructor(webGL: WebGLRenderingContext, vertexBuffer: any,resourceMap: ResourceMap) {
        this.kSimpleVS = "../src/Renderer/Shader/GLSLShaders/SimpleVS.glsl";  // Path to the VertexShader
        this.kSimpleFS = "../src/Renderer/Shader/GLSLShaders/SimpleFS.glsl";  // Path to the simple FragmentShader
        this.mainSceneFile = "../tests/Game/assets/scenes/scene.xml"; // Path to the main game scene

        this._webGL = webGL;
        this._vertexBuffer = vertexBuffer;
        this._resourceMap = resourceMap;

        this.resourceLoader = new ResourceLoader(this._resourceMap);
        this.textFileLoader = new TextFileLoader(this._resourceMap, this.resourceLoader);
        this._sceneFileParser = new SceneFileParser(this._resourceMap, this.textFileLoader);
    }

    /**
     * Accessor of the SimpleShader context
     */
    public getShader() : SimpleShader {
        return this._shader;
    }

    /**
     *  Create the shaders programs
     * @param callBackFunction
     */
    private createShaders(callBackFunction: CallableFunction) {
        /**
         * initialize the shaders
         */
        this._shader = new SimpleShader(this._webGL, this._vertexBuffer, this._resourceMap);

        /**
         * create the shader program
         */
        this._shader.initialize(this.kSimpleVS, this.kSimpleFS);

        callBackFunction();
    }

    /**
     * @todo melhorar a chamada para a função de callback
     * @todo ela está sendo chamada para cada carregamento de arquivos
     *
     * Loads the shaders resources
     * @param callBackFunction
     */
    initialize (callBackFunction: CallableFunction) {
        this.textFileLoader.loadTextFile(
            this.kSimpleVS,
            this.resourceLoader.MAPPED_FILE_TYPE.TEXT_FILE,
            () => console.log('loaded')
        );

        this.textFileLoader.loadTextFile(
            this.kSimpleFS,
            this.resourceLoader.MAPPED_FILE_TYPE.TEXT_FILE,
            () => console.log('loaded')
        );

        this._resourceMap.setLoadCompleteCallback(() => this.createShaders(callBackFunction));
    }

    /**
     * Loads the scene file by name
     * @param sceneName
     */
    loadScene (sceneName: string, gameLoop: any) {
        if (!sceneName) {
            sceneName = this.mainSceneFile;
        }

        this.textFileLoader.loadTextFile(
            sceneName,
            this.resourceLoader.MAPPED_FILE_TYPE.XML_FILE,
            () => this.parseSceneFile(sceneName, gameLoop)
        );
    }

    /**
     *
     */
    public getLoadedScripts() : Array<number|Object> {
        return this._sceneFileParser.getLoadedScripts();
    }

    /**
     * Parse the scene file
     */
    private parseSceneFile(sceneName: string, gameLoop: any) : void {
        if (!sceneName) {
            return;
        }

        this._sceneFileParser.parse(sceneName);
        gameLoop.loadScripts(this.getLoadedScripts());
    }
}