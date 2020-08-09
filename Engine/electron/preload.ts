// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

/**
 * Core Game Engine
 */
import Engine from '../src/Core/Engine';

/**
 * Simple game test
 * Importando todos os arquivos presentes na pasta scene/scripts
 * Esses arquivos serão injetados dentro do gameLoop
 */
import * as scripts from "../tests/Game/assets/scripts";

window.addEventListener('DOMContentLoaded', () => {
    /**
     * Loads the Game Engine
     */
    new Engine('GLCanvas').init(scripts);
})