import Transform from '../Transform';
import SimpleShader from '../../Shader/SimpleShader';
import ResourceMap from '../../../Core/Resources/ResourceMap';
import TextureProcessor from '../../../Core/Resources/Texture/TextureProcessor';
import Texture from '../../../Core/Resources/Texture/Texture';

export default class Renderable {
    /**
     * WebGL Instance
     */
    protected webGL: WebGLRenderingContext;

    /**
     * ResourceMap Instance
     */
    protected resourceMap: ResourceMap;

    /**
     * Game Object Transform Instance
     */
    protected gameObjectTransform: Transform;

    /**
     * Shader Instance
     */
    protected shader: any;

    /**
     * Color of renderable object
     */
    protected color: Array<number> = [];

    /**
     * Loads the texture image
     */
    protected texture : string;

    /**
     * Set game object as sprite
     */
    protected isSprite : boolean;

    /**
     * Texture Coordinates
     */
    protected mTexLeft: any = 0.0;   // bounds of texture coordinate (0 is left, 1 is right)
    protected mTexRight: any = 1.0;  //
    protected mTexTop: any = 1.0;    //   1 is top and 0 is bottom of image
    protected mTexBottom: any = 0.0; //

    /**
     * Texture Coordinates Array
     */
    protected eTexCoordArrayA : any = Object.freeze({
        eLeft: 2,
        eRight: 0,
        eTop: 1,
        eBottom: 5
    });

    /**
     * Texture Processor
     */
    protected textureProcessor : TextureProcessor;

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
     *  Loads the texture
     * @param texture
     */
    public loadTexture(texture : string, pixelPosition: Array<number> = []) : this {
        this.texture = texture;
        this.textureProcessor.loadTexture(
            this.texture,
            () => this.setElementPixelPositions(
                pixelPosition[0],
                pixelPosition[1],
                pixelPosition[2],
                pixelPosition[3]
            )
        );
        return this;
    }

    /**
     * Set game object as sprite
     */
    public setAsSpriteObject() : this {
        this.isSprite = true;
        return this;
    }

    /**
     * Get the loaded texture
     */
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
     *
     */
    public getElementUVCoordinateArray() : any {
        return [
            this.mTexRight,  this.mTexTop,
            this.mTexLeft,   this.mTexTop,
            this.mTexRight,  this.mTexBottom,
            this.mTexLeft,   this.mTexBottom
        ];
    }

    /**
     *
     * @param left
     * @param right
     * @param bottom
     * @param top
     */
    public setElementUVCoordinate (left: any, right: any, bottom: any, top: any) {
        this.mTexLeft = left;
        this.mTexRight = right;
        this.mTexBottom = bottom;
        this.mTexTop = top;
    }

    /**
     *
     * @param left
     * @param right
     * @param bottom
     * @param top
     */
    public setElementPixelPositions (left: any, right: any, bottom: any, top: any) {
        let sizes = this.getLoadedTextureSizes();
        this.mTexLeft = left / sizes[0];
        this.mTexRight = right / sizes[0];
        this.mTexBottom = bottom / sizes[1];
        this.mTexTop = top / sizes[1];
    };

    /**
     *
     */
    protected getLoadedTextureSizes() : Array<number> {
        let texture: Texture = <Texture> this.textureProcessor.getTextureInfo(this.texture);

        if (typeof(texture) != 'object') {
            return [1, 1];
        }

        // entire image width, height
        return [
            texture.getWidth(),
            texture.getHeight()
        ];
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

        if (this.isSprite) {
            this.shader.setTextureCoordinate(this.getElementUVCoordinateArray());
        }

        this.shader.activateShader(this.color, vpMatrix); // always activate the shader first!
        this.shader.loadObjectTransform(this.gameObjectTransform.getTransform());
        this.webGL.drawArrays(this.webGL.TRIANGLE_STRIP, 0, 4);
    }
}
