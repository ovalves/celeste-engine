/**
 * A simple game test class
 */
export default class GameTest {
    private engine: any = null;

    /**
     * guarda a instancia do shader que será usado para criar os game objects
     */
    private shader: any = null;

    // variables for the squares
    private gameObject1: any = null;        // these are the Renderable objects
    private gameObject2: any = null;

    // The camera to view the scene
    private mCamera: any = null;

    /**
     * Constructor
     * @param engine
     */
    constructor(engine: any) {
        this.engine = engine;
        this.init();
    }

    /**
     * Init game test
     * @param engine
     */
    init() {
        /**
         * Step A: Objetos instanciados pela game engine
         *  - O webGL é iniciado
         *  - O VertexBuffer (responsável por criar os vértices dos objetos) é iniciado
         *  - O criador de shader é iniciado
         *  - O render de game objects (Renderable) é iniciado
         */
        // Step B: Setup the camera
        this.mCamera = this.engine.getCamera().create(
            this.engine.getVector2().fromValues(20, 60), // center of the WC
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
        this.shader = this.engine.getSimpleShader();
        this.shader.addShader(
            "../src/Renderer/Shader/GLSLShaders/SimpleVS.glsl", // Path to the VertexShader
            "../src/Renderer/Shader/GLSLShaders/SimpleFS.glsl"   // Path to the FragmentShader
        );

        /**
         * Criando 2 instancias da classe de criação de game object
         */
        let renderGameObject1 = this.engine.getRenderable();
        let renderGameObject2 = this.engine.getRenderable();

        /**
         * Alterando a cor dos shaders e criando 6 instancias de game object
         */
        this.gameObject1 = renderGameObject1.createObject(this.shader).setColor([1, 1, 1, 1]);
        this.gameObject2 = renderGameObject2.createObject(this.shader).setColor([1, 0, 0, 1]);

        this.gameObject1.getTransform().position().setPosition(20, 60);
        this.gameObject1.getTransform().rotation().setRotationInRad(0.2); // In Radians
        this.gameObject1.getTransform().scale().setSize(5, 5);

        // Step  E: Initialize the red Renderable object: centered 2x2
        this.gameObject2.getTransform().position().setPosition(20, 60);
        this.gameObject2.getTransform().scale().setSize(2, 2);

        // Step F: Start the game loop running
        this.engine.getGameLoop().start(this);
    }

    public draw() {
        // Step C: Limpando o canvas antes de desenhar os game objects
        this.engine.clearCanvas([0.9, 0.9, 0.9, 1]);

        // Step  B: Activate the drawing Camera
        this.mCamera.setupViewProjection();

        // Step  C: Activate the white shader to draw
        this.gameObject1.draw(this.mCamera.getVPMatrix());

        // Step  D: Activate the red shader to draw
        this.gameObject2.draw(this.mCamera.getVPMatrix());
    }

    public update() {
        // For this very simple game, let's move the white square and pulse the red

        // Step A: move the white square
        var transformGameObject1 = this.gameObject1.getTransform();
        var deltaX = 0.05;

        // this is the right-bound of the window
        if (transformGameObject1.position().getXPos() > 30) {
            transformGameObject1.position().setPosition(10, 60);
        }
        transformGameObject1.position().incXPosBy(deltaX);
        transformGameObject1.rotation().incRotationByDegree(1);

        // Step B: pulse the red square
        var transformGameObject2 = this.gameObject2.getTransform();

        if (transformGameObject2.scale().getWidth() > 5) {
            transformGameObject2.scale().setSize(2, 2);
        }

        transformGameObject2.scale().incSizeBy(0.05);
    }
}