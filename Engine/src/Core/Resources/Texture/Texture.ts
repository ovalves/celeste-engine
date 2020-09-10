export default class Texture {
    private name : string;
    private width : number;
    private height : number;
    private textureId : WebGLTexture;

    constructor(name : string, width : number, height : number, id : WebGLTexture) {
        this.name = name;
        this.width = width;
        this.height = height;
        this.textureId = id;
    }

    public getName() {
        return this.name;
    }

    public getWidth() {
        return this.width;
    }

    public getHeight() {
        return this.height;
    }

    public getTextureId() {
        return this.textureId;
    }
}