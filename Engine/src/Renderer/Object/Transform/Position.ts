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

    public setPosition(xPos: any, yPos: any) {
        this.setXPos(xPos); this.setYPos(yPos);
    }

    public getPosition() {
        return this.mPosition;
    }

    public getXPos() {
        return this.mPosition[0];
    }

    public setXPos(xPos: any) {
        this.mPosition[0] = xPos;
    }

    public incXPosBy(delta: any) {
        this.mPosition[0] += delta;
    }

    public getYPos() {
        return this.mPosition[1];
    }

    public setYPos(yPos: any) {
        this.mPosition[1] = yPos;
    }

    public incYPosBy(delta: any) {
        this.mPosition[1] += delta;
    }
}