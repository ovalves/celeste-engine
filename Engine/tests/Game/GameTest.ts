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

        // Step B: Setup the camera
        let mCamera = engine.getCamera().create(
            engine.getVector2().fromValues(20, 60), // center of the WC
            20,                                     // width of WC
            [20, 40, 600, 300]                      // viewport (orgX, orgY, width, height)
        );

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
        let render2 = obj2.createObject(this.shader).setColor([0.8, 0.8, 0, 1]);
        let render3 = obj3.createObject(this.shader).setColor([0.9, 0.1, 0.1, 1]);
        let render4 = obj4.createObject(this.shader).setColor([0.1, 0.9, 0.1, 1]);
        let render5 = obj5.createObject(this.shader).setColor([0.1, 0.1, 0.9, 1]);
        let render6 = obj6.createObject(this.shader).setColor([0.1, 0.1, 0.1, 1]);

        // Step C: Limpando o canvas antes de desenhar os game objects
        engine.clearCanvas([0.9, 0.9, 0.9, 1]);

        // Step F: Starts the drawing by activating the camera
        mCamera.setupViewProjection();
        let vpMatrix = mCamera.getVPMatrix();

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