import { vec2, vec3, mat2, mat2d, mat3, mat4, quat, quat2 } from 'gl-matrix';

import Position from './Transform/Position';
import Scale from './Transform/Scale';
import Rotation from './Transform/Rotation';

/**
 * Responsável pela transformação dos game-object
 * Responsável por:
 *  - posicionamento
 *  - Escala
 *  - Rotação
 */
export default class Transform {

    /**
     * handles with game object translation
     */
    private positionGameObject: Position;

    /**
     * handles with game object scaling
     */
    private scaleGameObject: Scale;

    /**
     * handles with game object rotation
     */
    private rotationGameObject: Rotation;

    /**
     * Transform object
     * These instance variables store the values for the corresponding operators:
     *
     * positionGameObject for translation,
     * scaleGameObject for scaling,
     * and rotationGameObject for rotation
     */
    constructor() {
        this.positionGameObject = new Position();
        this.scaleGameObject = new Scale();
        this.rotationGameObject = new Rotation();
    }

    public position() {
        return this.positionGameObject;
    }

    public scale() {
        return this.scaleGameObject;
    }

    public rotation() {
        return this.rotationGameObject;
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
     * Chamado pela classe Renderable - para transformar o posicionamento, escala e rotação dos game object
     *
     */
    public getTransform() {
        // Creates a blank identity matrix
        let matrix = mat4.create();

        // The matrices that WebGL uses are transposed, thus the typical matrix
        // operations must be in reverse.

        // Step A: compute translation, for now z is always at 0.0
        mat4.translate(
            matrix,
            matrix,
            vec3.fromValues(
                this.position().getXPos(),
                this.position().getYPos(),
                0.0
            )
        );

        // Step B: concatenate with rotation.
        mat4.rotateZ(
            matrix,
            matrix,
            this.rotation().getRotationInRad()
        );

        // Step C: concatenate with scaling
        mat4.scale(
            matrix,
            matrix,
            vec3.fromValues(
                this.scale().getWidth(),
                this.scale().getHeight(),
                1.0
            )
        );

        return matrix;
    }
}