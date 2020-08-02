/*
 * File: MyGame.js
 * This is the logic of our game. For now, this is very simple.
 */
/*jslint node: true, vars: true */
/*global gEngine: false, SimpleShader: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict"; // Operate in Strict mode such that variables must be declared before used!

class GameTest {
    constructor(engine) {
        this.init(engine);
    }

    init(engine) {
        // The shader for drawing
        this.mShader = null;

        // Step A: Initialize the webGL Context and the VertexBuffer

        // Step B: Create, load and compile the shaders
        // this.mShader = new SimpleShader("VertexShader", "FragmentShader");

        // Step C: Draw!
        // Step C1: Clear the canvas
        engine.clearCanvas([0, 0.8, 0, 1]);

        // Step C2: Activate the proper shader
        engine.getShader().activateShader();

        // Step C3: Draw with the currently activated geometry and the activated shader
        var gl = engine.getGL();
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
}

module.exports.GameTest = GameTest;