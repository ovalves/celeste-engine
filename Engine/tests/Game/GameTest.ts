/**
 * A simple game test class
 */
export default class GameTest {
    /**
     * guarda a instancia do shader que será usado para criar os game objects
     */
    private shader: any = null;

    /**
     * Constructor
     * @param engine
     */
    constructor(engine: any) {
        this.init(engine);
    }

    /**
     * Init game test
     * @param engine
     */
    init(engine: any) {
        /**
         * Step A: Objetos instanciados pela game engine
         *  - O webGL é iniciado
         *  - O VertexBuffer (responsável por criar os vértices dos objetos) é iniciado
         *  - O criador de shader é iniciado
         *  - O render de game objects (Renderable) é iniciado
         */

        /**
         * Step B:
         *  - Buscando uma instancia do criador de shader
         *  - Adicionando alguns shaders
         *      - Passos executados pela game engine ao adicionar novos shaders
         *          - A game engine irá criar, carregar e compilar os programas dos shaders internamente
         */
        this.shader = engine.getShader();
        this.shader.addShader(
            "../src/Renderer/Shader/GLSLShaders/SimpleVS.glsl", // Path to the VertexShader
            "../src/Renderer/Shader/GLSLShaders/SimpleFS.glsl"   // Path to the FragmentShader
        );

        /**
         * Criando 6 instancias da classe de criação de game object
         */
        let obj1 = engine.getRenderable();
        let obj2 = engine.getRenderable();
        let obj3 = engine.getRenderable();
        let obj4 = engine.getRenderable();
        let obj5 = engine.getRenderable();
        let obj6 = engine.getRenderable();

        /**
         * Alterando a cor dos shaders e criando 6 instancias de game object
         */
        let render1 = obj1.createObject(this.shader).setColor([0.25, 0.25, 0.95, 1]);
        let render2 = obj2.createObject(this.shader).setColor([1, 0.25, 0.25, 1]);
        let render3 = obj3.createObject(this.shader).setColor([0.9, 0.1, 0.1, 1]);
        let render4 = obj4.createObject(this.shader).setColor([0.1, 0.9, 0.1, 1]);
        let render5 = obj5.createObject(this.shader).setColor([0.1, 0.1, 0.9, 1]);
        let render6 = obj6.createObject(this.shader).setColor([0.1, 0.1, 0.1, 1]);

        // Step C: Limpando o canvas antes de desenhar os game objects
        engine.clearCanvas([0.9, 0.9, 0.9, 1]);

        // Step E1: Criando a viewport no WebGL: Area no canvas para ser desenhada
        engine.getGL().viewport(
            20,     // x position of bottom-left corner of the area to be drawn
            40,     // y position of bottom-left corner of the area to be drawn
            600,    // width of the area to be drawn
            300     // height of the area to be drawn
        );

        // Step E2: Criando a area de corte com o mesmo tamanho da viewport para limpar a area do desenho
        /**
         * The scissor area tests and limits the area to be cleared.
         * Since the testing involved in scissor() is computationally expensive, it is disabled immediately after use.
         */
        engine.getGL().scissor(
            20,     // x position of bottom-left corner of the area to be drawn
            40,     // y position of bottom-left corner of the area to be drawn
            600,    // width of the area to be drawn
            300     // height of the area to be drawn
        );

        // Step E3: enable the scissor area, clear, and then disable the scissor area
        engine.getGL().enable(engine.getGL().SCISSOR_TEST);
        engine.clearCanvas([0.8, 0.8, 0.8, 1.0]);  // clear the scissor area
        engine.getGL().disable(engine.getGL().SCISSOR_TEST);


        // F: Set up View and Projection matrices">
        var viewMatrix = engine.getMatrix4().create();
        var projMatrix = engine.getMatrix4().create();
        // Step F1: define the view matrix
        engine.getMatrix4().lookAt(viewMatrix,
            [20, 60, 10],   // camera position
            [20, 60, 0],    // look at position
            [0, 1, 0]);     // orientation

        // Step F2: define the projection matrix
        engine.getMatrix4().ortho(projMatrix,
            -10,     // distance to left of WC
            10,     // distance to right of WC
            -5,      // distance to bottom of WC
            5,      // distance to top of WC
            0,      // distance to near plane
            1000);  // distance to far plane

        var vpMatrix = engine.getMatrix4().create();
        engine.getMatrix4().multiply(vpMatrix, projMatrix, viewMatrix);

        // Step G: Draw the blue square
        // Centre Blue, slightly rotated square
        render1.getTransform().position().setPosition(20, 60);
        render1.getTransform().rotation().setRotationInRad(0.2); // In Radians
        render1.getTransform().scale().setSize(5, 5);
        render1.draw(vpMatrix);

        // Step H: Draw the center and the corner squares
        // centre red square
        render2.getTransform().position().setPosition(20, 60);
        render2.getTransform().scale().setSize(2, 2);
        render2.draw(vpMatrix);

        // top left
        render3.getTransform().position().setPosition(10, 65);
        render3.draw(vpMatrix);

        // top right
        render4.getTransform().position().setPosition(30, 65);
        render4.draw(vpMatrix);

        // bottom right
        render5.getTransform().position().setPosition(30, 55);
        render5.draw(vpMatrix);

        // bottom left
        render6.getTransform().position().setPosition(10, 55);
        render6.draw(vpMatrix);
    }
}