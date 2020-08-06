import { vec2 } from 'gl-matrix';

/**
 * Responsável por posicionar os game objects na tela
 */
export default class Position {
    /**
     * Guarda o valor da posição do objeto na tela
     */
    private mPosition: vec2 = [0, 0];

    constructor() {
        this.mPosition = vec2.fromValues(0, 0);  // this is the translation
    }

    public setPosition(xPos: number, yPos: number) {
        this.setXPos(xPos); this.setYPos(yPos);
    }

    public getPosition() {
        return this.mPosition;
    }

    public getXPos() {
        return this.mPosition[0];
    }

    public setXPos(xPos: number) {
        this.mPosition[0] = xPos;
    }

    public incXPosBy(delta: number) {
        this.mPosition[0] += delta;
    }

    public getYPos() {
        return this.mPosition[1];
    }

    public setYPos(yPos: number) {
        this.mPosition[1] = yPos;
    }

    public incYPosBy(delta: number) {
        this.mPosition[1] += delta;
    }
}