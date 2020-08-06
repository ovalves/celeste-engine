import { vec2, vec3, mat2, mat2d, mat3, mat4, quat, quat2 } from 'gl-matrix';


import WebGL from './WebGL';
import VertexBuffer from './VertexBuffer';
import SimpleShader from '../Renderer/Shader/SimpleShader';
import Renderable from '../Renderer/Object/Renderable';
import Camera from '../Scene/Camera';

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
     * Shader Instance
     */
    private _shader: SimpleShader;

    /**
     * Constructor
     * @param htmlCanvasID Canvas id on HTML Document
     */
    constructor(htmlCanvasID: string) {
        this._webGL        = new WebGL(htmlCanvasID).getWebGL();
        this._vertexBuffer = new VertexBuffer(this._webGL);
        this._shader       = new SimpleShader();
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
     * Accessor of the SimpleShader context
     */
    public getShader() : SimpleShader {
        return this._shader;
    }

    /**
     * Accessor of the renderable object
     */
    public getRenderable() : Renderable {
        return new Renderable(this._webGL);
    }

    public getCamera() : Camera {
        return new Camera(this._webGL);
    }

    /**
     * Accessor to the vec2 GL-Matrix object
     */
    public getVector2() : Object {
        return vec2;
    }

    /**
     * Accessor to the vec3 GL-Matrix object
     */
    public getVector3() : Object {
        return vec3;
    }

    /**
     * Accessor to the mat2 GL-Matrix object
     */
    public getMatrix2() : Object {
        return mat2;
    }

    /**
     * Accessor to the mat2d GL-Matrix object
     */
    public getMatrix2D() : Object {
        return mat2d;
    }

    /**
     * Accessor to the mat3 GL-Matrix object
     */
    public getMatrix3() : Object {
        return mat3;
    }

    /**
     * Accessor to the mat4 GL-Matrix object
     */
    public getMatrix4() : Object {
        return mat4;
    }

    /**
     * Accessor to the quat GL-Matrix object
     */
    public getQuaternion() : Object {
        return quat;
    }

    /**
     * Accessor to the quat2 GL-Matrix object
     */
    public getQuaternion2() : Object {
        return quat2;
    }

    /**
     * Init Game Engine
     */
    init() : Engine {
        /**
         * initialize the VertexBuffer
         */
        this._vertexBuffer.initialize();

        /**
         * initialize the shaders
         */
        this._shader.initialize(
            this._webGL,
            this._vertexBuffer
        );

        return this;
    };

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