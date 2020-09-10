import Renderable from "./Renderable";
import ResourceMap from '../../../Core/Resources/ResourceMap';

export default class SpriteAnimateRenderable extends Renderable {

    private AnimationType = Object.freeze({
        eAnimateRight: 0,     // Animate from first (left) towards right, when hit the end, start from the left again
        eAnimateLeft: 1,      // Compute find the last element (in the right), start from the right animate left-wards,
        eAnimateSwing: 2      // Animate from first (left) towards the right, when hit the end, animates backwards
    });

    private mFirstElmLeft = 0.0; // 0.0 is left corner of image
    private mElmTop = 1.0;  // 1.0 is top corner of image
    private mElmWidth = 1.0;     // default sprite element size is the entire image
    private mElmHeight = 1.0;
    private mWidthPadding = 0.0;
    private mNumElems = 1;   // number of elements in an animation

    //
    // per animation settings
    private mUpdateInterval = 1;   // how often to advance
    private mAnimationType = this.AnimationType.eAnimateRight;

    private mCurrentAnimAdvance = -1;
    private mCurrentElm = 0;
    private mCurrentTick = 0;

    constructor(webGL: WebGLRenderingContext, resourceMap: ResourceMap) {
        super(webGL, resourceMap);
        this.init();
    }

    public init() : void {
        // All coordinates are in texture coordinate (UV between 0 to 1)

        // Information on the sprite element
        this.mFirstElmLeft = 0.0; // 0.0 is left corner of image
        this.mElmTop = 1.0;  // 1.0 is top corner of image
        this.mElmWidth = 1.0;     // default sprite element size is the entire image
        this.mElmHeight = 1.0;
        this.mWidthPadding = 0.0;
        this.mNumElems = 1;   // number of elements in an animation

        //
        // per animation settings
        this.mUpdateInterval = 1;   // how often to advance
        this.mAnimationType = this.AnimationType.eAnimateRight;

        this.mCurrentAnimAdvance = -1;
        this.mCurrentElm = 0;
        this.initAnimation();
    }

    private initAnimation() {
        // Currently running animation
        this.mCurrentTick = 0;
        switch (this.mAnimationType) {
        case this.AnimationType.eAnimateRight:
            this.mCurrentElm = 0;
            this.mCurrentAnimAdvance = 1; // either 1 or -1
            break;
        case this.AnimationType.eAnimateSwing:
            this.mCurrentAnimAdvance = -1 * this.mCurrentAnimAdvance; // swings ...
            this.mCurrentElm += 2 * this.mCurrentAnimAdvance;
            break;
        case this.AnimationType.eAnimateLeft:
            this.mCurrentElm = this.mNumElems - 1;
            this.mCurrentAnimAdvance = -1; // either 1 or -1
            break;
        }

        this.setSpriteElement();
    }

    private setSpriteElement() {
        let left = this.mFirstElmLeft + (this.mCurrentElm * (this.mElmWidth + this.mWidthPadding));
        this.setElementUVCoordinate(
            left,
            left + this.mElmWidth,
            this.mElmTop - this.mElmHeight,
            this.mElmTop
        );
    }

    /**
     *  Loads the texture
     * @param texture
     */
    public loadTexture(texture : string, pixelPosition: Array<number> = []) : this {
        this.texture = texture;
        this.textureProcessor.loadTexture(
            this.texture,
            () => this.setSpriteSequence(
                pixelPosition[0],
                pixelPosition[1],
                pixelPosition[2],
                pixelPosition[3],
                pixelPosition[4],
                pixelPosition[5]
            )
        );
        return this;
    }

    /**
     *
     * @param topPixel offset from top-left
     * @param leftPixel offset from top-left
     * @param elmWidthInPixel
     * @param elmHeightInPixel
     * @param numElements number of elements in sequence
     * @param wPaddingInPixel left/right padding
     */
    public setSpriteSequence(
        topPixel : number,
        leftPixel : number,
        elmWidthInPixel : number,
        elmHeightInPixel : number,
        numElements : number,
        wPaddingInPixel : number
    ) : void {
        let sizes = this.getLoadedTextureSizes();

        this.mNumElems = numElements;   // number of elements in animation
        this.mFirstElmLeft = leftPixel / sizes[0];
        this.mElmTop = topPixel / sizes[1];
        this.mElmWidth = elmWidthInPixel / sizes[0];
        this.mElmHeight = elmHeightInPixel / sizes[1];
        this.mWidthPadding = wPaddingInPixel / sizes[0];
        this.initAnimation();
    }

    /**
     * set the number of update calls before advancing the animation
     * @param tickInterval how often to advance
     */
    public setAnimationSpeed(tickInterval : number) {
        this.mUpdateInterval = tickInterval;
    };

    /**
     * number of update calls before advancing the animation
     * @param deltaInterval how often to advance
     */
    public incAnimationSpeed(deltaInterval : number) {
        this.mUpdateInterval += deltaInterval;
    };

    /**
     *
     * @param animationType
     */
    public setAnimationType(animationType : number) {
        this.mAnimationType = animationType;
        this.mCurrentAnimAdvance = -1;
        this.mCurrentElm = 0;
        this.initAnimation();
    };

    /**
     *
     */
    public updateAnimation() {
        this.mCurrentTick++;
        if (this.mCurrentTick >= this.mUpdateInterval) {
            this.mCurrentTick = 0;
            this.mCurrentElm += this.mCurrentAnimAdvance;
            if ((this.mCurrentElm >= 0) && (this.mCurrentElm < this.mNumElems)) {
                this.setSpriteElement();
            } else {
                this.initAnimation();
            }
        }
    }
}