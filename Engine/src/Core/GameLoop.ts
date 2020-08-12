import MonoBehaviour from './MonoBehaviour';

export default class GameLoop {
    /**
     * Engine class
     */
    private engine: any = null;

    /**
     * The camera to view the scene
     */
    private camera: any = null;

    /**
     * Frames per second
     */
    private kFPS = 60;

    /**
     * Milliseconds per frame
     */
    private kMPF = 1000 / this.kFPS;

    /**
     * Variables for timing gameloop
     */
    private mPreviousTime = Date.now();
    private mLagTime = 0;


    /**
     * The current loop state (running or should stop)
     */
    private mIsLoopRunning = false;

    /**
     * Game scripts
     */
    private gameScripts: Array<number|Object> = [];

    /**
     * Constructor
     * @param engine
     */
    constructor(engine: any) {
        this.engine = engine;
    }

    // This function assumes it is sub-classed from MyGame
    private _runLoop() {
        if (!this.mIsLoopRunning) {
            return;
        }

        if (this.mIsLoopRunning) {
            // Step A: set up for next call to _runLoop and update input!
            requestAnimationFrame(() => this._runLoop());

            // Step B: compute how much time has elapsed since we last RunLoop was executed
            var currentTime = Date.now();
            var elapsedTime = currentTime - this.mPreviousTime;
            this.mPreviousTime = currentTime;
            this.mLagTime += elapsedTime;

            // Step C: Make sure we update the game the appropriate number of times.
            //      Update only every Milliseconds per frame.
            //      If lag larger then update frames, update until caught up.
            while ((this.mLagTime >= this.kMPF) && this.mIsLoopRunning) {
                /**
                 * Atualiza o registro de eventos de inputs
                 */
                this.engine.getInput().update();
                /**
                 * call game scripts update method
                 */
                this.gameScripts.forEach((script: any) => {
                    script.update();
                });
                this.mLagTime -= this.kMPF;
            }

            // Step C: Limpando o canvas antes de desenhar os game objects
            this.engine.clearCanvas([0.9, 0.9, 0.9, 1]);

            // Step  B: Activate the drawing Camera
            /**
             * @todo setando a projeção de view apenas para a camera primária
             * @todo a projeção de view deve ser setada para todas as cameras
             */
            this.camera[0].setupViewProjection();

            /**
             * call game scripts draw method
             */
            this.gameScripts.forEach((script: any) => {
                script.draw(); // Call MyGame.draw()
            });
        }
    };

    /**
     * Carrega os arquivos presentes na cena
     * @param scripts
     */
    public loadScripts (scripts: Object, cameras: any, sceneGameObject: Array<Object>) {
        if (!cameras) {
            return;
        }

        this.camera = [...cameras];
        let monoBehaviour = new MonoBehaviour(this.engine, this.camera, sceneGameObject);
        let that = this;
        this.engine.getResourceMap().setLoadCompleteCallback(
            function () {
                [].forEach.call(scripts, function(script: any) {
                    let obj = (new script(monoBehaviour));
                    obj.start();
                    that.gameScripts.push(obj);
                });
                that._startLoop();
            }
        );
    };

    /**
     * Stop the game loop
     */
    public stop() {
        this.gameScripts = [];
        this.mIsLoopRunning = false;
    };

    /**
     * Start de the game loop
     * @param scripts
     */
    private _startLoop () {
        if (this.mIsLoopRunning) {
            return;
        }

        // Step A: reset frame time
        this.mPreviousTime = Date.now();
        this.mLagTime = 0.0;

        // Step B: remember that loop is now running
        this.mIsLoopRunning = true;

        // Step C: request _runLoop to start when loading is done
        requestAnimationFrame(() => this._runLoop());
    };
}