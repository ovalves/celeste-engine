/**
 * A simple game test class
 */
class Player {
    /**
     * Renderable objects
     */
    // public gameObject1: any = null;

    constructor(MonoBehaviour) {
        console.log(MonoBehaviour);
    }

    start() {
        console.log('player');
    }
}

module.exports = Player;