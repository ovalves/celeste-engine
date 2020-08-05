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
         * Criando instancias do renderable de game objects
         */
        let renderable1 = engine.getRenderable();
        let renderable2 = engine.getRenderable();

        /**
         * Criando um objeto em branco unsando os shaders do passo B
         */
        let render1 = renderable1.createObject(this.shader).setColor([0, 0, 1, 1]);

        /**
         * Criando um objeto em vermelho unsando os shaders do passo B
         */
        let render2 = renderable2.createObject(this.shader).setColor([1, 0, 0, 1]);

        // Step C: Limpando o canvas antes de desenhar os game objects
        engine.clearCanvas([0, 0.8, 0, 1]);

        // Step E1: Desenhando o game object com shader branco (render1)
        render1.getTransform().position().setPosition(-0.25, 0.25);
        render1.getTransform().rotation().setRotationInRad(0.5); // In Radians
        render1.getTransform().scale().setSize(0.5, 0.5);
        render1.draw();

        // Step E3: Desenhando o game object com shader vermelho (render2)
        render2.getTransform().position().setXPos(0.25);  // to show alternative to setPosition
        render2.getTransform().position().setYPos(-0.25); // it is possible to setX/Y separately
        render2.getTransform().rotation().setRotationInDegree(45);  // this is in Degree
        render2.getTransform().scale().setWidth(0.4);  // to show alternative to setSize
        render2.getTransform().scale().setHeight(0.4);  // that it is possible to width/height separately
        render2.draw();
    }
}