/**
 * A simple game test class
 */

class FirstScript {
    constructor(MonoBehaviour) {
        this.gameObject1 = null;
        this.monoBehaviour = MonoBehaviour;
    }

    /**
     *
     */
    start() {
        /**
         * Step B:
         *  - Buscando uma instancia do criador de shader
         *  - Adicionando alguns shaders
         *      - Passos executados pela game engine ao adicionar novos shaders
         *          - A game engine irá criar, carregar e compilar os programas dos shaders internamente
         */
        // let shader = this.getColorShader();
        let shader = this.monoBehaviour.getShader();

        /**
         * Criando 2 instancias da classe de criação de game object
         */
        let renderGameObject1 = this.monoBehaviour.getRenderable();

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
    draw() {
        // Step  C: Activate the white shader to draw
        this.gameObject1.draw(this.monoBehaviour.getCamera().getVPMatrix());
    }

    /**
     *
     */
    update() {
        // Step A: move the white square
        var transformGameObject1 = this.gameObject1.getTransform();
        var deltaX = 0.05;

        // this is the right-bound of the window
        const RIGHT = this.monoBehaviour.getInput().getKey(this.monoBehaviour.key().RIGHT);
        const UP = this.monoBehaviour.getInput().getKey(this.monoBehaviour.key().UP);

        if (this.monoBehaviour.getInput().isKeyPressed(RIGHT)) {
            if (transformGameObject1.position().getXPos() > 30) {
                transformGameObject1.position().setPosition(10, 60);
            }
            transformGameObject1.position().incXPosBy(deltaX);
        }

        if (this.monoBehaviour.getInput().isKeyClicked(UP)) {
            transformGameObject1.rotation().incRotationByDegree(10);
        }
    }
}

module.exports = FirstScript;