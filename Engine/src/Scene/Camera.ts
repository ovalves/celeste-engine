import { mat4 } from 'gl-matrix';

export default class Camera {
    /**
     * WebGL Instance
     */
    private webGL: WebGLRenderingContext;

    /**
     * Is a vec2 of the center of the World Coordinate Viewport
     */
    private mWCCenter: any;

    /**
     * Is the width of the user defined World Coordinate
     *  - Height of the user defined WC is implicitly defined by the viewport aspect ratio
     */
    private mWCWidth: number;

    /**
     * An array of 4 elements
     *  - [0] [1]: (x,y) position of lower left corner on the canvas (in pixel)
     *  - [2]: width of viewport
     *  - [3]: height of viewport
     */
    private mViewport: Array<number>;
    private mNearPlane: number;
    private mFarPlane: number;
    private mViewMatrix: mat4;
    private mProjMatrix: mat4;
    private mVPMatrix: mat4;
    private mBgColor: Array<number>;

    constructor(webGL: WebGLRenderingContext) {
        this.webGL  = <WebGLRenderingContext> webGL;
    }

    create(wcCenter: any, wcWidth: number, viewportArray: Array<number>) {
        // World Coordinate and viewport position and size
        this.mWCCenter = wcCenter;
        this.mWCWidth = wcWidth;
        this.mViewport = viewportArray;  // [x, y, width, height]
        this.mNearPlane = 0;
        this.mFarPlane = 1000;

        // transformation matrices
        this.mViewMatrix = mat4.create();
        this.mProjMatrix = mat4.create();
        this.mVPMatrix = mat4.create();

        // background color
        this.mBgColor = [0.8, 0.8, 0.8, 1]; // RGB and Alpha
        return this;
    }

    /**
     * setter/getter of WC and viewport
     */
    public setWCCenter(xPos: number, yPos: number) {
        this.mWCCenter[0] = xPos;
        this.mWCCenter[1] =  yPos;
        return this;
    };

    public getWCCenter() {
        return this.mWCCenter;
    };

    public setWCWidth(width: number) {
        this.mWCWidth = width;
        return this;
    };

    public setViewport(viewportArray: Array<number>) {
        this.mViewport = viewportArray;
        return this;
    };

    public getViewport() {
        return this.mViewport;
    };

    public setBackgroundColor(newColor: Array<number>) {
        this.mBgColor = newColor;
        return this;
    };

    public getBackgroundColor() {
        return this.mBgColor;
    };

    /**
     * Getter for the View-Projection transform operator
     */
    public getVPMatrix() {
        return this.mVPMatrix;
    };

    /**
     * Initializes the camera to begin drawing
     */
    public setupViewProjection() {
        /**
         * Step A1: Set up the viewport: area on canvas to be drawn
         */
        this.webGL.viewport(
            this.mViewport[0], // x position of bottom-left corner of the area to be drawn
            this.mViewport[1], // y position of bottom-left corner of the area to be drawn
            this.mViewport[2], // width of the area to be drawn
            this.mViewport[3]  // height of the area to be drawn
        );

        // Step A2: set up the corresponding scissor area to limit the clear area
        this.webGL.scissor(
            this.mViewport[0], // x position of bottom-left corner of the area to be drawn
            this.mViewport[1], // y position of bottom-left corner of the area to be drawn
            this.mViewport[2], // width of the area to be drawn
            this.mViewport[3]  // height of the area to be drawn
        );

        // Step A3: set the color to be clear
        // set the color to be cleared
        this.webGL.clearColor(
            this.mBgColor[0],
            this.mBgColor[1],
            this.mBgColor[2],
            this.mBgColor[3]
        );

        // Step A4: enable the scissor area, clear, and then disable the scissor area
        this.webGL.enable(this.webGL.SCISSOR_TEST);
        this.webGL.clear(this.webGL.COLOR_BUFFER_BIT);
        this.webGL.disable(this.webGL.SCISSOR_TEST);

        // Step  B: Set up the View-Projection transform operator
        // Step B1: define the view matrix
        mat4.lookAt(
            this.mViewMatrix,
            [this.mWCCenter[0], this.mWCCenter[1], 10],
            [this.mWCCenter[0], this.mWCCenter[1], 0],
            [0, 1, 0] // orientation
        );

        // Step B2: define the projection matrix
        var halfWCWidth = 0.5 * this.mWCWidth;

        // viewportH/viewportW
        var halfWCHeight = halfWCWidth * this.mViewport[3] / this.mViewport[2];

        mat4.ortho(this.mProjMatrix,
            -halfWCWidth,    // distance to left of WC
            halfWCWidth,     // distance to right of WC
            -halfWCHeight,   // distance to bottom of WC
            halfWCHeight,    // distance to top of WC
            this.mNearPlane, // z-distance to near plane
            this.mFarPlane   // z-distance to far plane
        );

        // Step B3: concatenate view and project matrices
        mat4.multiply(this.mVPMatrix, this.mProjMatrix, this.mViewMatrix);
    };
}
