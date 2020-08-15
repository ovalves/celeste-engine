import Transform from '../Transform';
import SimpleShader from '../../Shader/SimpleShader';
import ResourceMap from '../../../Core/Resources/ResourceMap';
import TextureProcessor from '../../../Core/Resources/Texture/TextureProcessor';

export default class Renderable {
    /**
     * WebGL Instance
     */
    private webGL: WebGLRenderingContext;

    /**
     * ResourceMap Instance
     */
    private resourceMap: ResourceMap;

    /**
     * Game Object Transform Instance
     */
    private gameObjectTransform: Transform;

    /**
     * Shader Instance
     */
    private shader: any;

    /**
     * Color of renderable object
     */
    private color: Array<number> = [];

    private texture : string;

    private textureProcessor : TextureProcessor;

    /**
     * Constructor
     * @param webGL WebGLRenderingContext
     */
    constructor(webGL: WebGLRenderingContext, resourceMap: ResourceMap) {
        this.webGL  = <WebGLRenderingContext> webGL;
        this.resourceMap = resourceMap;
        this.gameObjectTransform = new Transform();
        this.textureProcessor = new TextureProcessor(
            this.webGL,
            this.resourceMap
        );
    }

    /**
     * Sets color on the renderable object
     * @param color Array<number>
     */
    public setColor(color: Array<number>) : Renderable {
        this.color = color;
        return this;
    }

    /**
     * Getting the game object shader color
     */
    public getColor() : Array<number> {
        return this.color;
    }

    /**
     * Creating an game object
     * @param shader
     */
    public createObject(shader : SimpleShader) : Renderable {
        this.shader = shader;
        return this;
    }

    /**
     *
     * @param texture
     */
    public loadTexture(texture : string) : this {
        this.texture = texture;
        this.textureProcessor.loadTexture(this.texture);
        return this;
    }

    public getTexture () {
        return this.texture;
    }

    /**
     * Retorna a classe de transform dos game objects
     * Dá acesso as classes de Position, Rotation e Scale para transformar um game object
     */
    public getTransform() : Transform {
        return this.gameObjectTransform;
    }

    /**
     * Draw object on the screen
     */
    public draw(vpMatrix: Array<number>) : void {
        if (!this.shader) {
            return;
        }

        /**
         * Active the texture on game object
         */
        if (this.texture) {
            this.setColor([1, 1, 1, 0]);
            this.textureProcessor.activateTexture(this.texture);
        }

        this.shader.activateShader(this.color, vpMatrix); // always activate the shader first!
        this.shader.loadObjectTransform(this.gameObjectTransform.getTransform());
        this.webGL.drawArrays(this.webGL.TRIANGLE_STRIP, 0, 4);
    }
}
