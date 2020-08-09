import Transform from './Transform';

export default class Renderable {
    /**
     * WebGL Instance
     */
    private webGL: WebGLRenderingContext;

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

    /**
     * Constructor
     * @param webGL WebGLRenderingContext
     */
    constructor(webGL: WebGLRenderingContext) {
        this.webGL  = <WebGLRenderingContext> webGL;
        this.gameObjectTransform = new Transform();
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
    public createObject(shader : any) : Renderable {
        this.shader = shader;
        return this;
    }

    public getTransform() : Transform {
        return this.gameObjectTransform;
    }
    /**
     * Draw object on the screen
     */
    public draw(vpMatrix: Array<number>) {
        /**
         * Prevenindo a chamada de ativação do shader enquanto o mesmo ainda está sendo carregado
         */
        if (!this.shader) {
            return;
        }
        this.shader.activateShader(this.color, vpMatrix); // always activate the shader first!
        this.shader.loadObjectTransform(this.gameObjectTransform.getTransform());
        this.webGL.drawArrays(this.webGL.TRIANGLE_STRIP, 0, 4);
    }
}
