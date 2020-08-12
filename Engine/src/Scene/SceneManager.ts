import DefaultResourcesLoader from '../Core/Resources/DefaultResourcesLoader';
import SceneFileParser from './SceneFileParser';
import AudioManager from '../Audio/AudioManager';

export default class SceneManager {
    private _webGL: WebGLRenderingContext;
    private resourcesLoader: any;
    private audioManager: AudioManager;
    private _sceneFileParser: SceneFileParser;

    private mainSceneFile: string;

    /**
     * Constructor
     * @param webGL
     * @param resourceMap
     */
    constructor(webGL: WebGLRenderingContext, resourcesLoader: DefaultResourcesLoader) {
        this.mainSceneFile = "../tests/Game/assets/scenes/scene.xml"; // Path to the main game scene
        this._webGL = webGL;
        this.resourcesLoader = resourcesLoader;
    }

    /**
     *
     * @param audioManager
     */
    public setAudioManager(audioManager: AudioManager) : this {
        this.audioManager = audioManager;
        return this;
    }

    /**
     * Loads the scene file by name
     * @param sceneName
     * @param gameLoop
     */
    public loadScene (sceneName: string, gameLoop: any) {
        this.unloadScene();

        if (!sceneName) {
            sceneName = this.mainSceneFile;
        }

        this.resourcesLoader.getTextFileLoader().loadTextFile(
            sceneName,
            this.resourcesLoader.getResourceLoader().MAPPED_FILE_TYPE.XML_FILE,
            () => this.parseSceneFile(sceneName, gameLoop)
        );
    }

    /**
     * Unload scene
     */
    public unloadScene () {
        if (typeof this._sceneFileParser !== 'undefined') {
            this.audioManager.unloadAudios(this._sceneFileParser.getLoadedAudios());
        }

        this._sceneFileParser = new SceneFileParser(
            this._webGL,
            this.resourcesLoader.getResourceMap()
        );
    }

    /**
     * Retorna os scripts presentes na cena
     */
    public getLoadedScripts() : Array<number|Object> {
        return this._sceneFileParser.getLoadedScripts();
    }

    /**
     * Retorna as cameras presentes na cena
     */
    public getLoadedCameras() : Array<number|Object> {
        return this._sceneFileParser.getLoadedCameras();
    }

    /**
     * Retorna os game objects presentes na cena
     */
    public getLoadedGameObjects() : Array<Object> {
        return this._sceneFileParser.getLoadedGameObjects();
    }

    /**
     * Parse the scene file
     */
    private parseSceneFile(sceneName: string, gameLoop: any) : void {
        if (!sceneName) {
            return;
        }

        this._sceneFileParser
            .setDefaultShader(this.resourcesLoader.getShader())
            .setAudioManager(this.audioManager)
            .parse(sceneName);

        gameLoop.loadScripts(
            this.getLoadedScripts(),
            this.getLoadedCameras(),
            this.getLoadedGameObjects()
        );
    }
}