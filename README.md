[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/ovalves/v-engine/blob/master/LICENSE)
[![Read the Docs](https://readthedocs.org/projects/selene-framework/badge/?version=latest)](https://selene-framework.readthedocs.io/en/latest/?badge=latest)
[![PR's Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)](http://makeapullrequest.com)  
![GitHub contributors](https://img.shields.io/github/contributors/ovalves/selene)

## About V-Engine
V-Engine is a simple game engine that allows you to write legible and realiable code for high quality 2D games. 
We believe development must be an enjoyable and creative experience to be truly fulfilling.

- [Simple, fast game engine](###).
- [User input manager](###).
- [Multiple scenes on project](###).
- [Audio manager](###).
- [Filesystem manager](###).

This is a minimal Game Engine based on the [Build your own 2d game engine](https://github.com/apress/build-your-own-2d-game-engine).

## Prerequisites

Before you begin, ensure you have met the following requirements:
<!--- These are just example requirements. Add, duplicate or remove as required --->
* To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

## Installing v-engine

To install v-engine, follow these steps:

```bash
# Clone this repository
git clone https://github.com/ovalves/v-engine.git
# Go into the repository
cd v-engine
# Install dependencies
npm install
# Run the app
npm run start
```

## Using v-engine

A basic game made with the V-Engine needs just these files:

- `package.json` - Points to the app's main file and lists its details and dependencies.
- `main.js` - Starts the app and creates a browser window to render HTML. This is the app's **main process**.
- `index.html` - A web page to render. This is the app's **renderer process**.

To use <project_name>, follow these steps:

## How to Use
### Simple Game engine script class
- `constructor(MonoBehaviour)`
- `start()`
- `draw()`
- `update()`
```js
class FirstScript {
    /**
     * Recebe por padrão uma classe com todos métodos da engine
     *
     * @param MonoBehaviour
     */
    constructor(MonoBehaviour) {
        this.gameObject1 = null;
        this.kBgClip = "../tests/Game/assets/sounds/BGClip.mp3";
        this.kCue = "../tests/Game/assets/sounds/MyGame_cue.wav";
        this.monoBehaviour = MonoBehaviour;
    }

    /**
     * Executado sempre que o game object linkado a este script é instanciado na cena
     */
    start() {
        this.gameObject1 = this.monoBehaviour.getGameObject('OBJECT_NAME');
    }

    /**
     * Executado pelo gameloop a frame a frame
     */
    draw() {
        // Pssando a camera principal da cena para desenhar o objeto
        this.gameObject1.draw(this.monoBehaviour.getMainCamera().getVPMatrix());
    }

    /**
     * Executado pelo gameloop a frame a frame
     */
    update() {
        // Game Logic
    }
}
```

# MonoBehaviour Methods
- getRenderable() : Renderable
    * setColor(color: Array<number>) : Renderable
    * getColor() : Array<number>
    * createObject(shader : any) : Renderable
    * draw(vpMatrix: Array<number>) : void
    * getTransform() : Transform
        * position()
            * setPosition(xPos: number, yPos: number)
            * getPosition()
            * setXPos(xPos: number)
            * getXPos()
            * incXPosBy(delta: number)
            * getYPos()
            * setYPos(yPos: number)
            * incYPosBy(delta: number)
        * rotation()
            * setRotationInRad(rotationInRadians: number)
            * setRotationInDegree(rotationInDegree: number)
            * incRotationByDegree(deltaDegree: number)
            * incRotationByRad(deltaRad: number)
            * getRotationInRad()
            * getRotationInDegree()

        * scale()
            * setSize(width: number, height: number)
            * getSize()
            * incSizeBy(delta: number)
            * getWidth()
            * setWidth(width: number)
            * incWidthBy(delta: number)
            * getHeight()
            * setHeight(height: number)
            * incHeightBy(delta: number)
* getSimpleShader()
* getTextureShader()
* getGameObject(objectName: string)
* changeScene(sceneName: string)
* getAudio()
* playBackgroundAudio(audioName: string)
* playAudioTrack(audioName: string)
* getMainCamera()
* getCameras()
* getInput()
    * isKeyPressed(keyCode: any)
    * isKeyClicked(keyCode: any)
    * getKey(searchedKey: string)
* key()
* getVector2()
* getVector3()
* getMatrix2()
* getMatrix2D()
* getMatrix3()
* getMatrix4()
* getQuaternion()
* getQuaternion2()

## Resources for Learning V-Engine
You can learn more about each of these components within the
- [Quick Start Guide](https://github-url).
- [vengine.org/docs](https://electronjs.org/docs) - all of V-Engine's documentation
- [vengine-quick-start](https://github.com/vengine/vengine-quick-start) - a very basic starter 2D game


## Contributing to v-engine
<!--- If your README is long or you have some specific process or steps you want contributors to follow, consider creating a separate CONTRIBUTING.md file--->
To contribute to <project_name>, follow these steps:

1. Fork this repository.
2. Create a branch: `git checkout -b <branch_name>`.
3. Make your changes and commit them: `git commit -m '<commit_message>'`
4. Push to the original branch: `git push origin <project_name>/<location>`
5. Create the pull request.

Alternatively see the GitHub documentation on [creating a pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

## Contributors

Thanks to the following people who have contributed to this project:

* [@ovalves](https://github.com/ovalves) 📖

You might want to consider using something like the [All Contributors](https://github.com/all-contributors/all-contributors) specification and its [emoji key](https://allcontributors.org/docs/en/emoji-key).

## Contact

If you want to contact me you can reach me at <vinicius_o.a@live.com>.

## License
<!--- If you're not sure which open license to use see https://choosealicense.com/--->

This project uses the following license: MIT (https://github.com/ovalves/v-engine/blob/master/LICENSE).
