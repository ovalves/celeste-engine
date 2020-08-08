import MonoBehaviour from '../../../../src/Core/MonoBehaviour';

/**
 * A simple game test class
 */
export default class SecondScript extends MonoBehaviour {
    // variables for the squares
    private gameObject2: any = null;

    /**
     * Init game test
     * @param engine
     */
    start() {
         /**
         * Step B:
         *  - Buscando uma instancia do criador de shader
         *  - Adicionando alguns shaders
         *      - Passos executados pela game engine ao adicionar novos shaders
         *          - A game engine irá criar, carregar e compilar os programas dos shaders internamente
         */
        let shader = this.getShader();
        shader.addShader(
            "../src/Renderer/Shader/GLSLShaders/SimpleVS.glsl", // Path to the VertexShader
            "../src/Renderer/Shader/GLSLShaders/SimpleFS.glsl"   // Path to the FragmentShader
        );

        /**
         * Criando 2 instancias da classe de criação de game object
         */
        let renderGameObject2 = this.getRenderable();

            /**
         * Alterando a cor dos shaders e criando 6 instancias de game object
         */
        this.gameObject2 = renderGameObject2.createObject(shader).setColor([1, 0, 0, 1]);

        /**
         * Alterando a cor dos shaders e criando 6 instancias de game object
         */
        // Step  E: Initialize the red Renderable object: centered 2x2
        this.gameObject2.getTransform().position().setPosition(20, 60);
        this.gameObject2.getTransform().scale().setSize(2, 2);
    }

    public draw() {

        // Step  D: Activate the red shader to draw
        this.gameObject2.draw(this.getCamera().getVPMatrix());
    }

    public update() {
        // For this very simple game, let's move the white square and pulse the red

        // Step B: pulse the red square
        var transformGameObject2 = this.gameObject2.getTransform();

        if (transformGameObject2.scale().getWidth() > 5) {
            transformGameObject2.scale().setSize(2, 2);
        }

        transformGameObject2.scale().incSizeBy(0.05);
    }
}