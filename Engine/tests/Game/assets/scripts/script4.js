/**
 * A simple game test class
 */
class Enemy {
    constructor(MonoBehaviour) {
        console.log(MonoBehaviour);
    }

    start() {
        console.log('enemy');
    }
}

module.exports = Enemy;