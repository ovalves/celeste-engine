// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const type of['chrome', 'node', 'electron']) {
        replaceText(`${type}-version`, process.versions[type])
    }

    // Core Game Engine
    const { Engine } = require('../src/Core/Engine');

    /**
     * @todo Running a simple test game
     */
    const { GameTest } = require('../tests/Game/GameTest');

    // Loads the Game Engine
    const engine = new Engine('GLCanvas').init();

    // Loads a simple Game Test
    new GameTest(engine);
})