/**
 * A simple game test class
 */

class FirstScript {
    constructor(MonoBehaviour) {
        this.gameObject1 = null;
        this.kBgClip = "../tests/Game/assets/sounds/BGClip.mp3";
        this.kCue = "../tests/Game/assets/sounds/MyGame_cue.wav";
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
        this.gameObject1 = this.monoBehaviour.getGameObject('obj1');
        this.monoBehaviour.playBackgroundAudio(this.kBgClip);
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
            this.monoBehaviour.playAudioTrack(this.kCue);
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
            this.monoBehaviour.changeScene("../tests/Game/assets/scenes/scene2.xml");
        }
    }
}

module.exports = FirstScript;