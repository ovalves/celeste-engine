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
            "../src/GLSLShaders/SimpleVS.glsl", // Path to the VertexShader
            "../src/GLSLShaders/SimpleFS.glsl"   // Path to the FragmentShader
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

        // Step D1: Desenhando o game object com shader branco (render1)
        render1.draw();

        // Step D2: Desenhando o game object com shader vermelho (render1)
        render2.draw();
    }
}