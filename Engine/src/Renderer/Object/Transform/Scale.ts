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

    public setSize(width: any, height: any) {
        this.setWidth(width);
        this.setHeight(height);
    };

    public getSize() {
        return this.mScale;
    };

    public incSizeBy(delta: any) {
        this.incWidthBy(delta);
        this.incHeightBy(delta);
    };

    public getWidth() {
        return this.mScale[0];
    };

    public setWidth(width: any) {
        this.mScale[0] = width;
    };

    public incWidthBy(delta: any) {
        this.mScale[0] += delta;
    };

    public getHeight() {
        return this.mScale[1];
    };

    public setHeight(height: any) {
        this.mScale[1] = height;
    };

    public incHeightBy(delta: any) {
        this.mScale[1] += delta;
    };
}