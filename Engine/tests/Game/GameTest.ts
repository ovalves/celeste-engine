export default class GameTest {
    private shader: any = null;

    constructor(engine: any) {
        this.init(engine);
    }

    init(engine: any) {
        // Step A: Initialize the webGL Context and the VertexBuffer
        // Initialized by the Game Engine

        // Step B: Create, load and compile the shaders
        this.shader = engine.getShader();
        this.shader.addShader(
            "../src/Core/GLSLShaders/SimpleVS.glsl", // Path to the VertexShader
            "../src/Core/GLSLShaders/SimpleFS.glsl"   // Path to the FragmentShader
        );

        // Step C: Draw!
        // Step C1: Clear the canvas
        engine.clearCanvas([0, 0.8, 0, 1]);
        // Step C2: Activate the proper shader
        this.shader.activateShader([0, 0, 1, 1]); // Pixel Color parameter

        // Step C3: Draw with the currently activated geometry and the activated shader
        var gl = engine.getGL();
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
}