/**
 * Responsável por rotacionar os game objects na tela
 */
export default class Rotation {
    /**
     * Guarda o valor da rotação (em raios)
     */
    private mRotationInRad: number = 0.0;

    constructor() {
        this.mRotationInRad = 0.0;
    }

    public setRotationInRad(rotationInRadians: any) {
        this.mRotationInRad = rotationInRadians;
        while (this.mRotationInRad > (2 * Math.PI)) {
            this.mRotationInRad -= (2 * Math.PI);
        }
    };

    public setRotationInDegree(rotationInDegree: any) {
        this.setRotationInRad(rotationInDegree * Math.PI / 180.0);
    };

    public incRotationByDegree(deltaDegree: any) {
        this.incRotationByRad(deltaDegree * Math.PI / 180.0);
    };

    public incRotationByRad(deltaRad: any) {
        this.setRotationInRad(this.mRotationInRad + deltaRad);
    };

    public getRotationInRad() {
        return this.mRotationInRad;
    };

    public getRotationInDegree() {
        return this.mRotationInRad * 180.0 / Math.PI;
    };
}