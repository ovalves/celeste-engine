import ResourceMap from './ResourceMap';
import ResourceLoader from './ResourceLoader';
import TextFileLoader from './TextFileLoader';
import SimpleShader from '../../Renderer/Shader/SimpleShader';
import TextureShader from '../../Renderer/Shader/TextureShader';
import SpriteShader from '../../Renderer/Shader/SpriteShader';

export default class DefaultResourcesLoader {
    private _webGL: WebGLRenderingContext;
    private _vertexBuffer: any;
    private _simpleShader: SimpleShader;
    private _textureShader : TextureShader;
    private _spriteShader : SpriteShader;
    private _resourceMap: ResourceMap;
    private resourceLoader: ResourceLoader;
    private textFileLoader: TextFileLoader;

    /**
     * Simple Shader
     */
    private kSimpleVS: string;
    private kSimpleFS: string;
    private kTextureVS: string;
    private kTextureFS: string;
    private mainSceneFile: string;

    /**
     *
     * @param resourceMap
     */
    constructor(webGL: WebGLRenderingContext, vertexBuffer: any,resourceMap: ResourceMap) {
        this.kSimpleVS = "../src/Renderer/Shader/GLSLShaders/SimpleVS.glsl";  // Path to the VertexShader
        this.kSimpleFS = "../src/Renderer/Shader/GLSLShaders/SimpleFS.glsl";  // Path to the simple FragmentShader

        this.kTextureVS = "../src/Renderer/Shader/GLSLShaders/TextureVS.glsl";
        this.kTextureFS = "../src/Renderer/Shader/GLSLShaders/TextureFS.glsl";

        this.mainSceneFile = "../tests/Game/assets/scenes/scene.xml"; // Path to the main game scene

        this._webGL = webGL;
        this._vertexBuffer = vertexBuffer;
        this._resourceMap = resourceMap;

        this.resourceLoader = new ResourceLoader(this._resourceMap);
        this.textFileLoader = new TextFileLoader(this._resourceMap, this.resourceLoader);
    }

    /**
     * Accessor of the SimpleShader context
     */
    public getSimpleShader() : SimpleShader {
        return this._simpleShader;
    }

    /**
     * Accessor of the TextureShader context
     */
    public getTextureShader() : TextureShader {
        return this._textureShader;
    }

    /**
     * Accessor of the TextureShader context
     */
    public getSpriteShader() : SpriteShader {
        return this._spriteShader;
    }

    /**
     * Accessor of the Text File Loader
     */
    public getTextFileLoader() : TextFileLoader {
        return this.textFileLoader;
    }

    /**
     * Accessor of the Resource Mapper
     */
    public getResourceMap() : ResourceMap {
        return this._resourceMap;
    }

    /**
     * Accessor of the Resource Loader
     */
    public getResourceLoader() : ResourceLoader {
        return this.resourceLoader;
    }

    /**
     *  Create the shaders programs
     * @param callBackFunction
     */
    private createShaders(callBackFunction: CallableFunction) {
        /**
         * initialize the shaders
         */
        this._simpleShader = new SimpleShader(
            this._webGL,
            this._vertexBuffer,
            this._resourceMap
        );

        this._textureShader = new TextureShader(
            this._webGL,
            this._vertexBuffer,
            this._resourceMap
        );

        this._spriteShader = new SpriteShader(
            this._webGL,
            this._vertexBuffer,
            this._resourceMap
        );

        /**
         * create the shader program
         */
        this._simpleShader.initialize(this.kSimpleVS, this.kSimpleFS);
        this._textureShader.initialize(this.kTextureVS, this.kTextureFS);
        this._spriteShader.initialize(this.kTextureVS, this.kTextureFS);
        callBackFunction();
    }

    /**
     * Initialize the default engine resources
     * @param callBackFunction
     */
    initialize (callBackFunction: CallableFunction) {
        /**
         * simple shader
         */
        this.textFileLoader.loadTextFile(
            this.kSimpleVS,
            this.resourceLoader.MAPPED_FILE_TYPE.TEXT_FILE,
            () => console.log('loading simple vertex shader')
        );

        this.textFileLoader.loadTextFile(
            this.kSimpleFS,
            this.resourceLoader.MAPPED_FILE_TYPE.TEXT_FILE,
            () => console.log('loading simple fragment shader')
        );

        /**
         * texture shader
         */
        this.textFileLoader.loadTextFile(
            this.kTextureVS,
            this.resourceLoader.MAPPED_FILE_TYPE.TEXT_FILE,
            () => console.log('loading texture vertex shader')
        );

        this.textFileLoader.loadTextFile(
            this.kTextureFS,
            this.resourceLoader.MAPPED_FILE_TYPE.TEXT_FILE,
            () => console.log('loading texture fragment shader')
        );

        /**
         * @todo checar se o carregamento terminou antes de criar os programas de shader
         */
        this._resourceMap.setLoadCompleteCallback(() => this.createShaders(callBackFunction));
    }
}