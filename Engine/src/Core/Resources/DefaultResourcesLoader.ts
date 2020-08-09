import ResourceMap from './ResourceMap';
import ResourceLoader from './ResourceLoader';
import TextFileLoader from './TextFileLoader';
import SimpleShader from '../../Renderer/Shader/SimpleShader';

export default class DefaultResourcesLoader {
    private _webGL: WebGLRenderingContext;
    private _vertexBuffer: any;
    private _shader: SimpleShader;
    private _resourceMap: ResourceMap;
    private resourceLoader: ResourceLoader;
    private textFileLoader: TextFileLoader;

    /**
     * Simple Shader
     */
    private kSimpleVS: string;
    private kSimpleFS: string;

    /**
     *
     * @param resourceMap
     */
    constructor(webGL: WebGLRenderingContext, vertexBuffer: any,resourceMap: ResourceMap) {
        this.kSimpleVS = "../src/Renderer/Shader/GLSLShaders/SimpleVS.glsl";  // Path to the VertexShader
        this.kSimpleFS = "../src/Renderer/Shader/GLSLShaders/SimpleFS.glsl";  // Path to the simple FragmentShader

        this._webGL = webGL;
        this._vertexBuffer = vertexBuffer;
        this._resourceMap = resourceMap;

        this.resourceLoader = new ResourceLoader(this._resourceMap);
        this.textFileLoader = new TextFileLoader(this._resourceMap, this.resourceLoader);
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
    };

    /**
     *  Loads the shaders resources
     * @param callBackFunction
     */
    initialize (callBackFunction: CallableFunction) {
        this.textFileLoader.loadTextFile(
            this.kSimpleVS,
            this.resourceLoader.MAPPED_FILE_TYPE.TEXT_FILE,
            callBackFunction
        );

        this.textFileLoader.loadTextFile(
            this.kSimpleFS,
            this.resourceLoader.MAPPED_FILE_TYPE.TEXT_FILE,
            callBackFunction
        );

        this._resourceMap.setLoadCompleteCallback(() => this.createShaders(callBackFunction));
    };
}