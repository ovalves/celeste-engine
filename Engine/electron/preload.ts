// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

/**
 * Core Game Engine
 */
import Engine from '../src/Core/Engine/Engine';

/**
 * Simple game test
 */
import GameTest from '../tests/Game/GameTest';

window.addEventListener('DOMContentLoaded', () => {
    /**
     * Loads the Game Engine
     */
    const engine = new Engine('GLCanvas').init();

    /**
     * Loads and Running a simple game test
     */
    new GameTest(engine);
})