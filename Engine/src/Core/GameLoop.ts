import { vec2 } from 'gl-matrix';

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
    private gameScripts: Array<Object> = [];

    /**
     * Constructor
     * @param engine
     */
    constructor(engine: any) {
        this.engine = engine;
    }

    // This function assumes it is sub-classed from MyGame
    private _runLoop() {
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
            this.camera.setupViewProjection();

            /**
             * call game scripts draw method
             */
            this.gameScripts.forEach((script: any) => {
                script.draw(); // Call MyGame.draw()
            });
        }
    };

    /**
     * Start de the game loop
     * @param scripts
     */
    public start (scripts: any) {
        /**
         * @todo melhorar a forma de criar a camera da cena
         * @todo a criação da camera deve pertencer a classe da cena
         * @todo a camera deve ser passada como parametro para os game objects
         */
        this.camera = this.engine.getCamera().create(
            vec2.fromValues(20, 60),                // center of the WC
            20,                                     // width of WC
            [20, 40, 600, 300]                      // viewport (orgX, orgY, width, height)
        );

        /**
         * @todo melhorar a busca pelos arquivos da cena
         */
        let firstScript = new scripts.FirstScript(this.engine, this.camera);
        let secondScript = new scripts.SecondScript(this.engine, this.camera);
        firstScript.start();
        secondScript.start();

        /**
         * @todo melhorar a forma como instanciar os scripts da cena
         */
        this.gameScripts = [firstScript, secondScript];



        // Step A: reset frame time
        this.mPreviousTime = Date.now();
        this.mLagTime = 0.0;

        // Step B: remember that loop is now running
        this.mIsLoopRunning = true;

        // Step C: request _runLoop to start when loading is done
        requestAnimationFrame(() => this._runLoop());
    };
}