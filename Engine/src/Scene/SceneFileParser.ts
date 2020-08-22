import { vec2 } from 'gl-matrix';

import * as path from 'path'
import Camera from './Camera';
import Renderable from '../Renderer/Object/Renderables/Renderable';

export default class SceneFileParser {
    /**
     * WebGL Instance
     */
    private _webGL: WebGLRenderingContext;

    /**
     * ResourceMap Instance
     */
    private _resourceMap: any;

    /**
     * Dados do arquivo XML da cena
     */
    private sceneXmlDocument: XMLDocument;

    /**
     * Scripts carregados presentes na cena
     */
    private loadedScripts: Array<number|Object> = [];

    /**
     * Audios carregados presentes na cena
     */
    private loadedAudio: Array<string> = [];

    /**
     * Cameras presentes na cena
     */
    private loadedCameras: Array<number|Object> = [];

    /**
     * Cameras presentes na cena
     */
    private loadedGameObjects: any = [];

    /**
     * Object shader padrão
     */
    private _shader: any;

    /**
     * Object shader padrão
     */
    private _textureShader: any;

    /**
     * Object shader padrão
     */
    private _spriteShader: any;

    /**
     *
     */
    private audioManager: any;

    /**
     * Constructor
     * @param webGL
     * @param resourceMap
     */
    constructor(webGL: WebGLRenderingContext, resourceMap: any) {
        this._webGL = webGL;
        this._resourceMap = resourceMap;
    }

    /**
     * Retorna o elemento presente no XML da cena
     * @param sceneElement
     */
    private getSceneElement (sceneElement: string) {
        let element = this.sceneXmlDocument.getElementsByTagName(sceneElement);
        if (element.length === 0) {
            console.error("Warning: Level element:[" + sceneElement + "]: is not found!");
        }

        return element;
    };

    /**
     *  Retorna os scripts presentes na cena
     */
    public getLoadedScripts() : Array<number|Object> {
        return this.loadedScripts;
    }

    /**
     *  Retorna os audios presentes na cena
     */
    public getLoadedAudios() : Array<string> {
        return this.loadedAudio;
    }

    /**
     * Retorna as cameras presentes na cena
     */
    public getLoadedCameras() : Array<number|Object> {
        return this.loadedCameras;
    }

    /**
     * Retorna os game objects presentes na cena
     */
    public getLoadedGameObjects() : any {
        return this.loadedGameObjects;
    }

    /**
     * Seta o shader padrão para a criação dos game objects
     * @param shader
     * @returns self
     */
    public setDefaultShader(shader: any) : this {
        this._shader = shader;
        return this;
    }

    /**
     * Seta o shader padrão para a criação dos game objects
     * @param shader
     * @returns self
     */
    public setTextureShader(shader: any) : this {
        this._textureShader = shader;
        return this;
    }

    /**
     * Seta o shader padrão para a criação dos game objects
     * @param shader
     * @returns self
     */
    public setSpriteShader(shader: any) : this {
        this._spriteShader = shader;
        return this;
    }

    /**
     *
     * @param audioManager
     */
    public setAudioManager(audioManager: any) : this {
        this.audioManager = audioManager;
        return this;
    }

    /**
     * Parseia os dados do arquivo XML da cena
     * @param sceneName
     */
    public parse(sceneName: string) : void {
        this.sceneXmlDocument = this._resourceMap.retrieveAsset(sceneName);
        this.parseScripts();
        this.parseAudio();
        this.parseCamera();
        this.parseSquares();
    }

    /**
     * Parseia os dados dos scripts no arquivo de XML da cena
     */
    public parseScripts() {
        let scripts = this.getSceneElement("script");
        if (scripts.length < 1) {
            return this.getLoadedAudios();
        }
        for (let index = 0; index < scripts.length; index++) {
            let src = scripts[index].getAttribute("src");
            let script = require(path.join(__dirname, '../../', src));
            this.loadedScripts.push(script);
        }
    }

    /**
     * Parseia os dados dos scripts no arquivo de XML da cena
     */
    public parseAudio() {
        let audio = this.getSceneElement("Audio");
        if (audio.length < 1) {
            return;
        }

        for (let index = 0; index < audio.length; index++) {
            let src = audio[index].getAttribute("src");
            this.audioManager.loadAudio(src);
            this.loadedAudio.push(src);
        }
    }

    /**
     * Parseia os dados das cameras no arquivo de XML da cena
     */
    public parseCamera() {
        let cameras = this.getSceneElement("Camera");
        if (cameras.length < 1) {
            return;
        }
        for (let index = 0; index < cameras.length; index++) {
            let cx: number = Number(cameras[index].getAttribute("CenterX"));
            let cy: number = Number(cameras[index].getAttribute("CenterY"));
            let w = Number(cameras[index].getAttribute("Width"));
            let viewport: Array<number>|Array<string> = cameras[index].getAttribute("Viewport").split(",");
            let bgColor: Array<number>|Array<string> = cameras[index].getAttribute("BgColor").split(",");

            bgColor = bgColor.map(Number);
            viewport = viewport.map(Number);

            let camera = new Camera(this._webGL);
            camera.create(
                vec2.fromValues(cx, cy),
                w,
                viewport
            )

            camera.setBackgroundColor(bgColor);
            this.loadedCameras.push(camera);
        }
    };

    /**
     * Parseia os dados de game object do tipo square no arquivo de XML da cena
     */
    parseSquares() {
        let squares = this.getSceneElement("Square");
        if (squares.length < 1) {
            return;
        }

        let gameObjectName : string,
            posX : number,
            posY : number,
            width : number,
            height : number,
            rotation : number,
            color : Array<number> | Array<string>,
            square : Renderable,
            textureAttr : Attr,
            textureValue : string,
            spriteAttr : Attr,
            spriteValue : string;

        for (let i = 0; i < squares.length; i++) {
            gameObjectName = String(squares.item(i).attributes.getNamedItem("name").value);
            posX = Number(squares.item(i).attributes.getNamedItem("PosX").value);
            posY = Number(squares.item(i).attributes.getNamedItem("PosY").value);
            width = Number(squares.item(i).attributes.getNamedItem("Width").value);
            height = Number(squares.item(i).attributes.getNamedItem("Height").value);
            rotation = Number(squares.item(i).attributes.getNamedItem("Rotation").value);
            color = squares.item(i).attributes.getNamedItem("Color").value.split(",");
            textureAttr = squares.item(i).attributes.getNamedItem("Texture");

            spriteAttr = squares.item(i).attributes.getNamedItem("Sprite");

            if (textureAttr) {
                textureValue = String(textureAttr.value);
            }

            if (spriteAttr) {
                spriteValue = String(spriteAttr.value);
            }

            let shader = (textureValue)
                ? this._textureShader
                : (spriteValue)
                    ? this._spriteShader
                    : this._shader;

            square = (new Renderable(this._webGL, this._resourceMap)).createObject(shader);

            if (textureValue) {
                square.loadTexture(textureValue);
            }

            if (spriteValue) {
                square.loadTexture(spriteValue, [0, 120, 0, 180]);
            }

            color = color.map(Number);
            square.setColor(color);
            square.getTransform().position().setPosition(posX, posY);
            square.getTransform().rotation().setRotationInDegree(rotation);
            square.getTransform().scale().setSize(width, height);

            this.loadedGameObjects[gameObjectName] = square;
        }
    };
}
