/**
 * A simple game test class
 */
class Player {
    constructor(MonoBehaviour) {
        this.gameObject1 = null;
        this.monoBehaviour = MonoBehaviour;
    }

    start() {
        this.gameObject1 = this.monoBehaviour.getGameObject('obj3');
    }

    /**
     *
     */
    draw() {
        this.gameObject1.draw(this.monoBehaviour.getMainCamera().getVPMatrix());
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

        /**
         * mapeando a tecla espaço para trocar de cena
         */
        const changeScene = this.monoBehaviour.getInput().getKey(this.monoBehaviour.key().SPACE);

        if (this.monoBehaviour.getInput().isKeyPressed(RIGHT)) {
            if (transformGameObject1.position().getXPos() > 30) {
                transformGameObject1.position().setPosition(10, 60);
            }
            transformGameObject1.position().incXPosBy(deltaX);
        }

        if (this.monoBehaviour.getInput().isKeyClicked(UP)) {
            transformGameObject1.rotation().incRotationByDegree(10);
        }

        if (this.monoBehaviour.getInput().isKeyClicked(changeScene)) {
            // Carregando uma nova cena
            this.monoBehaviour.changeScene("../tests/Game/assets/scenes/scene.xml");
        }
    }
}

module.exports = Player;