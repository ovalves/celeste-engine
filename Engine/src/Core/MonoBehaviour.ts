import { vec2, vec3, mat2, mat2d, mat3, mat4, quat, quat2 } from 'gl-matrix';
import SimpleShader from '../Renderer/Shader/SimpleShader';
import Renderable from '../Renderer/Object/Renderable';
import Camera from '../Scene/Camera';

/**
 * Game Engine Core Class
 */
export default class MonoBehaviour {
    /**
     * Engine class
     */
    private engine: any = null;

    /**
     * The camera to view the scene
     */
    private camera: Camera = null;

    /**
     * Constructor
     *
     * @param engine
     * @param camera
     */
    constructor(engine: any, camera: Camera) {
        this.engine = engine;
        this.camera = camera;
    }

    /**
     * Accessor of the SimpleShader context
     */
    public getShader() : SimpleShader {
        return this.engine.getShader();
    }

    /**
     * Accessor of the renderable object
     */
    public getRenderable() : Renderable {
        return new Renderable(this.engine.getGL());
    }

    /**
     * Accessor of the Camera Viewport object
     */
    public getCamera() : Camera {
        return this.camera;
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
}