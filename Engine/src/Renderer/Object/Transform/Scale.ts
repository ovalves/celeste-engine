import { vec2 } from 'gl-matrix';

/**
 * Responsável por lidar com a escala dos game objects na tela
 */
export default class Scale {
    /**
     * Guarda o valor da escala do objeto na tela
     */
    private mScale: vec2 = [1, 1];

    constructor() {
        this.mScale = vec2.fromValues(1, 1); // this is the width (x) and height (y)
    }

    public setSize(width: number, height: number) {
        this.setWidth(width);
        this.setHeight(height);
    };

    public getSize() {
        return this.mScale;
    };

    public incSizeBy(delta: number) {
        this.incWidthBy(delta);
        this.incHeightBy(delta);
    };

    public getWidth() {
        return this.mScale[0];
    };

    public setWidth(width: number) {
        this.mScale[0] = width;
    };

    public incWidthBy(delta: number) {
        this.mScale[0] += delta;
    };

    public getHeight() {
        return this.mScale[1];
    };

    public setHeight(height: number) {
        this.mScale[1] = height;
    };

    public incHeightBy(delta: number) {
        this.mScale[1] += delta;
    };
}