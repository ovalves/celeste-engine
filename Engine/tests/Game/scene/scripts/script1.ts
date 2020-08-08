import MonoBehaviour from '../../../../src/Core/MonoBehaviour';

/**
 * A simple game test class
 */
export default class FirstScript extends MonoBehaviour {
    /**
     * Renderable objects
     */
    private gameObject1: any = null;

    /**
     *
     */
    public start() {
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
        let renderGameObject1 = this.getRenderable();

        /**
         * Alterando a cor dos shaders e criando 6 instancias de game object
         */
        this.gameObject1 = renderGameObject1.createObject(shader).setColor([1, 1, 1, 1]);

        this.gameObject1.getTransform().position().setPosition(20, 60);
        this.gameObject1.getTransform().rotation().setRotationInRad(0.2); // In Radians
        this.gameObject1.getTransform().scale().setSize(5, 5);
    }

    /**
     *
     */
    public draw() {
        // Step  C: Activate the white shader to draw
        this.gameObject1.draw(this.getCamera().getVPMatrix());
    }

    /**
     *
     */
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
    }
}