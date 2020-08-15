
import ResourceMap from "../ResourceMap";
import Texture from './Texture';

export default class TextureProcessor {
    /**
     * WebGL Instance
     */
    private webGL: WebGLRenderingContext;

    /**
     * ResourceMap Instance
     */
    private resourceMap: ResourceMap;

    /**
     *
     * @param webGL
     * @param resourceMap
     */
    constructor(webGL: WebGLRenderingContext, resourceMap: ResourceMap) {
        this.webGL  = <WebGLRenderingContext> webGL;
        this.resourceMap = resourceMap;
    }

    /*
     * This converts an image to the webGL texture format.
     * This should only be called once the texture is loaded.
     */
    private _processLoadedImage(textureName : string, image : HTMLImageElement) {
        // Generate a texture reference to the webGL context
        let textureID = <WebGLTexture> this.webGL.createTexture();

        // bind the texture reference with the current texture functionality in the webGL
        this.webGL.bindTexture(this.webGL.TEXTURE_2D, textureID);

        // Load the texture into the texture data structure with descriptive info.
        // Parameters:
        //  1: Which "binding point" or target the texture is being loaded to.
        //  2: Level of detail. Used for mipmapping. 0 is base texture level.
        //  3: Internal format. The composition of each element. i.e. pixels.
        //  4: Format of texel data. Must match internal format.
        //  5: The data type of the texel data.
        //  6: Texture Data.
        this.webGL.texImage2D(this.webGL.TEXTURE_2D, 0, this.webGL.RGBA, this.webGL.RGBA, this.webGL.UNSIGNED_BYTE, image);

        // Creates a mipmap for this texture.
        this.webGL.generateMipmap(this.webGL.TEXTURE_2D);

        // Tells WebGL that we are done manipulating data at the mthis.webGL.TEXTURE_2D target.
        this.webGL.bindTexture(this.webGL.TEXTURE_2D, null);

        let texture = new Texture(textureName, image.naturalWidth, image.naturalHeight, textureID);
        this.resourceMap.asyncLoadCompleted(textureName, texture);
    }

    // Loads an texture so that it can be drawn.
    // If already in the map, will do nothing.
    public loadTexture(textureName : string) {
        if (!(this.resourceMap.isAssetLoaded(textureName))) {
            // Create new Texture object.
            var img = new Image();

            // Update resources in loading counter.
            this.resourceMap.asyncLoadRequested(textureName);

            // When the texture loads, convert it to the WebGL format then put
            // it back into the mTextureMap.
            let that = this;
            img.onload = function () {
                that._processLoadedImage(textureName, img);
            };
            img.src = textureName;
        } else {
            this.resourceMap.incAssetRefCount(textureName);
        }
    }

    // Remove the reference to allow associated memory
    // be available for subsequent garbage collection
    public unloadTexture(textureName : string) {
        let texture = this.resourceMap.retrieveAsset(textureName);
        this.webGL.deleteTexture(texture.getTextureId());
        this.resourceMap.unloadAsset(textureName);
    }

    public activateTexture(textureName : string) {
        let texture = this.resourceMap.retrieveAsset(textureName);

        // Binds our texture reference to the current webGL texture functionality
        this.webGL.bindTexture(this.webGL.TEXTURE_2D, texture.getTextureId());

        // To prevent texture wrappings
        this.webGL.texParameteri(this.webGL.TEXTURE_2D, this.webGL.TEXTURE_WRAP_S, this.webGL.CLAMP_TO_EDGE);
        this.webGL.texParameteri(this.webGL.TEXTURE_2D, this.webGL.TEXTURE_WRAP_T, this.webGL.CLAMP_TO_EDGE);

        // Handles how magnification and minimization filters will work.
        this.webGL.texParameteri(this.webGL.TEXTURE_2D, this.webGL.TEXTURE_MAG_FILTER, this.webGL.LINEAR);
        this.webGL.texParameteri(this.webGL.TEXTURE_2D, this.webGL.TEXTURE_MIN_FILTER, this.webGL.LINEAR_MIPMAP_LINEAR);

        // For pixel-graphics where you want the texture to look "sharp" do the following:
        // this.webGL.texParameteri(this.webGL.TEXTURE_2D, this.webGL.TEXTURE_MAG_FILTER, this.webGL.NEAREST);
        // this.webGL.texParameteri(this.webGL.TEXTURE_2D, this.webGL.TEXTURE_MIN_FILTER, this.webGL.NEAREST);
    }

    public deactivateTexture() {
        this.webGL.bindTexture(this.webGL.TEXTURE_2D, null);
    };

    public getTextureInfo(textureName : string) {
        return this.resourceMap.retrieveAsset(textureName);
    }

}